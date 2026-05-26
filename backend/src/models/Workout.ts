import { Schema, model, Document, Types } from 'mongoose';

export type WorkoutType = 'Cardio' | 'Strength' | 'Flexibility' | 'Sports' | 'Other';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  name: string;
  type: WorkoutType;
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    name: {
      type: String,
      required: [true, 'Workout name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Cardio', 'Strength', 'Flexibility', 'Sports', 'Other'],
      required: [true, 'Workout type is required'],
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    caloriesBurned: {
      type: Number,
      required: [true, 'Calories burned is required'],
      min: [0, 'Calories cannot be negative'],
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for fast user + date queries
workoutSchema.index({ user: 1, date: -1 });

export default model<IWorkout>('Workout', workoutSchema);
