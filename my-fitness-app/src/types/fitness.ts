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
  id: number;
  name: string;
  type: 'Cardio' | 'Strength' | 'Flexibility';
  duration: string;
  calories: number;
  date: string;
  icon: string;
}

export interface DayActivity {
  day: string;
  steps: number;
  calories: number;
  isToday: boolean;
}

export interface Goal {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
}
