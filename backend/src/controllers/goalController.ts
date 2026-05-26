import { Request, Response, NextFunction } from 'express';
import Goal from '../models/Goal';

// GET /api/goals?userId=
export const getGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.query;
    const filter = userId ? { user: userId } : {};
    const goals = await Goal.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: goals });
  } catch (err) {
    next(err);
  }
};

// GET /api/goals/:id
export const getGoalById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ success: false, message: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};

// POST /api/goals
export const createGoal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/goals/:id — update current progress
export const updateGoalProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!goal) {
      res.status(404).json({ success: false, message: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/goals/:id
export const deleteGoal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      res.status(404).json({ success: false, message: 'Goal not found' });
      return;
    }
    res.json({ success: true, message: 'Goal deleted' });
  } catch (err) {
    next(err);
  }
};
