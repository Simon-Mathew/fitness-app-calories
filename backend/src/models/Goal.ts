import { Schema, model, Document, Types } from 'mongoose';

export interface IGoal extends Document {
  user: Types.ObjectId;
  title: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: '🎯',
    },
    current: {
      type: Number,
      required: [true, 'Current value is required'],
      min: [0, 'Current value cannot be negative'],
      default: 0,
    },
    target: {
      type: Number,
      required: [true, 'Target value is required'],
      min: [1, 'Target must be at least 1'],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

goalSchema.index({ user: 1 });

export default model<IGoal>('Goal', goalSchema);
