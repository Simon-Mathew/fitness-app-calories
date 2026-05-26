import { Request, Response, NextFunction } from 'express';
import Workout from '../models/Workout';

// GET /api/workouts?userId=&limit=&page=
export const getWorkouts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, limit = '10', page = '1' } = req.query;
    const filter = userId ? { user: userId } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [workouts, total] = await Promise.all([
      Workout.find(filter).sort({ date: -1 }).skip(skip).limit(Number(limit)),
      Workout.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: workouts,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/workouts/:id
export const getWorkoutById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      res.status(404).json({ success: false, message: 'Workout not found' });
      return;
    }
    res.json({ success: true, data: workout });
  } catch (err) {
    next(err);
  }
};

// POST /api/workouts
export const createWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ success: true, data: workout });
  } catch (err) {
    next(err);
  }
};

// PUT /api/workouts/:id
export const updateWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!workout) {
      res.status(404).json({ success: false, message: 'Workout not found' });
      return;
    }
    res.json({ success: true, data: workout });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/workouts/:id
export const deleteWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      res.status(404).json({ success: false, message: 'Workout not found' });
      return;
    }
    res.json({ success: true, message: 'Workout deleted' });
  } catch (err) {
    next(err);
  }
};
