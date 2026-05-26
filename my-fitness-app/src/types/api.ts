// Raw shapes returned by the backend — mirror the Mongoose models exactly.

export interface ApiWorkout {
  _id: string;
  user: string;
  name: string;
  type: 'Cardio' | 'Strength' | 'Flexibility' | 'Sports' | 'Other';
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string;
  date: string;        // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface ApiGoal {
  _id: string;
  user: string;
  title: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiDailyActivity {
  _id: string;
  user: string;
  date: string;        // ISO string
  caloriesBurned: number;
  activeMinutes: number;
  waterLitres: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiFoodEntry {
  _id:         string;
  date:        string;   // ISO string
  mealType:    'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  name:        string;
  calories:    number;
  protein:     number;
  carbs:       number;
  fat:         number;
  servingSize: number;
  servingUnit: string;
  createdAt:   string;
}

// Wrapper shapes the backend always sends
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pages: number;
  message?: string;
}
