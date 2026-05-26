export interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  progress: number; // 0–100
  goal: string;
  color: string;
}

export interface Workout {
  id: string;  // mapped from MongoDB _id
  name: string;
  type: 'Cardio' | 'Strength' | 'Flexibility' | 'Sports' | 'Other';
  duration: string;   // formatted: "32 min"
  calories: number;
  date: string;       // formatted: "Today, 6:30 AM"
  icon: string;       // derived from type on the frontend
}

export interface DayActivity {
  day: string;
  calories: number;
  isToday: boolean;
}

export interface Goal {
  id: string;  // mapped from MongoDB _id
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
}
