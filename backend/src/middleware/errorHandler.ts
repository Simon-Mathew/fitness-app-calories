import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

// 404 — no route matched
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: AppError = new Error(`Not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Global error handler
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? res.statusCode === 200 ? 500 : res.statusCode;

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: 'A record with that value already exists',
    });
    return;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
