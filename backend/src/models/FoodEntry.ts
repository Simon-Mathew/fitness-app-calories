import { Schema, model, Document, Types } from 'mongoose';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface IFoodEntry extends Document {
  user:        Types.ObjectId;
  date:        Date;
  mealType:    MealType;
  name:        string;
  calories:    number;
  protein:     number;  // grams (optional, defaults to 0)
  carbs:       number;  // grams
  fat:         number;  // grams
  servingSize: number;
  servingUnit: string;
  createdAt:   Date;
  updatedAt:   Date;
}

const foodEntrySchema = new Schema<IFoodEntry>(
  {
    user: {
      type:     Schema.Types.ObjectId,
      ref:      'User',
      required: false,   // auth is not wired yet
    },
    date: {
      type:     Date,
      required: [true, 'Date is required'],
      default:  Date.now,
    },
    mealType: {
      type:     String,
      enum:     ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      required: [true, 'Meal type is required'],
    },
    name: {
      type:     String,
      required: [true, 'Food name is required'],
      trim:     true,
    },
    calories: {
      type:     Number,
      required: [true, 'Calories are required'],
      min:      [0, 'Calories cannot be negative'],
    },
    protein: { type: Number, default: 0, min: 0 },
    carbs:   { type: Number, default: 0, min: 0 },
    fat:     { type: Number, default: 0, min: 0 },
    servingSize: { type: Number, default: 1, min: 0 },
    servingUnit: { type: String, default: 'serving', trim: true },
  },
  { timestamps: true }
);

// Fast lookups by date range
foodEntrySchema.index({ date: -1 });
foodEntrySchema.index({ user: 1, date: -1 });

export default model<IFoodEntry>('FoodEntry', foodEntrySchema);
