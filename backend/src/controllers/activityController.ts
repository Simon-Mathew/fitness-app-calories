import { Request, Response, NextFunction } from 'express';
import DailyActivity from '../models/DailyActivity';

// GET /api/activity?userId=&days=7
export const getActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, days = '7' } = req.query;

    const since = new Date();
    since.setDate(since.getDate() - Number(days));

    const filter: Record<string, unknown> = { date: { $gte: since } };
    if (userId) filter.user = userId;

    const records = await DailyActivity.find(filter).sort({ date: -1 });
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

// GET /api/activity/today?userId=
export const getTodayActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await DailyActivity.findOne({
      user: userId,
      date: { $gte: today },
    });

    res.json({ success: true, data: record ?? null });
  } catch (err) {
    next(err);
  }
};

// POST /api/activity — create or update today's record (upsert)
export const logActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, date, ...fields } = req.body;

    const day = new Date(date ?? Date.now());
    day.setHours(0, 0, 0, 0);

    const record = await DailyActivity.findOneAndUpdate(
      { user, date: day },
      { $set: fields },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

// GET /api/activity/summary?userId=
export const getWeeklySummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.query;

    const since = new Date();
    since.setDate(since.getDate() - 7);

    const records = await DailyActivity.find({
      user: userId,
      date: { $gte: since },
    });

    const summary = records.reduce(
      (acc, r) => ({
        totalCalories:  acc.totalCalories  + r.caloriesBurned,
        totalActiveMin: acc.totalActiveMin + r.activeMinutes,
        totalWater:     acc.totalWater     + r.waterLitres,
        activeDays:     acc.activeDays     + (r.caloriesBurned > 0 ? 1 : 0),
      }),
      { totalCalories: 0, totalActiveMin: 0, totalWater: 0, activeDays: 0 }
    );

    res.json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};
