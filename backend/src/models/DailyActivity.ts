import { Schema, model, Document, Types } from 'mongoose';

export interface IDailyActivity extends Document {
  user: Types.ObjectId;
  date: Date;
  caloriesBurned: number;
  activeMinutes: number;
  waterLitres: number;
  createdAt: Date;
  updatedAt: Date;
}

const dailyActivitySchema = new Schema<IDailyActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: [0, 'Calories cannot be negative'],
    },
    activeMinutes: {
      type: Number,
      default: 0,
      min: [0, 'Active minutes cannot be negative'],
    },
    waterLitres: {
      type: Number,
      default: 0,
      min: [0, 'Water intake cannot be negative'],
    },
  },
  { timestamps: true }
);

// One record per user per day
dailyActivitySchema.index({ user: 1, date: 1 }, { unique: true });

export default model<IDailyActivity>('DailyActivity', dailyActivitySchema);
