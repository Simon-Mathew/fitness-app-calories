import { Request, Response, NextFunction } from 'express';
import FoodEntry from '../models/FoodEntry';

// ── GET /api/food?date=YYYY-MM-DD ──────────────────────────────────────────
// Returns all entries for a single calendar day.

export const getFoodByDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { date } = req.query;

    const day = date ? new Date(date as string) : new Date();
    day.setHours(0, 0, 0, 0);

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const entries = await FoodEntry.find({
      date: { $gte: day, $lt: nextDay },
    }).sort({ createdAt: 1 });

    res.json({ success: true, data: entries });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/food ─────────────────────────────────────────────────────────

export const createFoodEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const entry = await FoodEntry.create(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/food/:id ──────────────────────────────────────────────────────

export const updateFoodEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const entry = await FoodEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!entry) {
      res.status(404).json({ success: false, message: 'Food entry not found' });
      return;
    }
    res.json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/food/:id ───────────────────────────────────────────────────

export const deleteFoodEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const entry = await FoodEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      res.status(404).json({ success: false, message: 'Food entry not found' });
      return;
    }
    res.json({ success: true, message: 'Entry deleted' });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/food/summary?date=YYYY-MM-DD ─────────────────────────────────
// Returns per-meal totals + grand totals for the day.

export const getDailySummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { date } = req.query;

    const day = date ? new Date(date as string) : new Date();
    day.setHours(0, 0, 0, 0);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const entries = await FoodEntry.find({ date: { $gte: day, $lt: nextDay } });

    const grand = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const byMeal: Record<string, typeof grand> = {
      Breakfast: { ...grand },
      Lunch:     { ...grand },
      Dinner:    { ...grand },
      Snack:     { ...grand },
    };

    for (const e of entries) {
      grand.calories += e.calories;
      grand.protein  += e.protein;
      grand.carbs    += e.carbs;
      grand.fat      += e.fat;

      byMeal[e.mealType].calories += e.calories;
      byMeal[e.mealType].protein  += e.protein;
      byMeal[e.mealType].carbs    += e.carbs;
      byMeal[e.mealType].fat      += e.fat;
    }

    res.json({ success: true, data: { totals: grand, byMeal } });
  } catch (err) {
    next(err);
  }
};
