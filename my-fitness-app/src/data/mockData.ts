import type { StatCardData, Workout, DayActivity, Goal } from '../types/fitness';

export const stats: StatCardData[] = [
  {
    id: 'steps',
    label: 'Steps',
    value: '8,432',
    unit: 'steps',
    icon: '👟',
    progress: 84,
    goal: '10,000',
    color: 'var(--accent)',
  },
  {
    id: 'calories',
    label: 'Calories Burned',
    value: '612',
    unit: 'kcal',
    icon: '🔥',
    progress: 71,
    goal: '860 kcal',
    color: '#f97316',
  },
  {
    id: 'active',
    label: 'Active Time',
    value: '47',
    unit: 'min',
    icon: '⏱️',
    progress: 63,
    goal: '75 min',
    color: '#22c55e',
  },
  {
    id: 'water',
    label: 'Water Intake',
    value: '1.8',
    unit: 'L',
    icon: '💧',
    progress: 60,
    goal: '3 L',
    color: '#38bdf8',
  },
];

export const weekActivity: DayActivity[] = [
  { day: 'Mon', steps: 9200,  calories: 720, isToday: false },
  { day: 'Tue', steps: 7500,  calories: 580, isToday: false },
  { day: 'Wed', steps: 11000, calories: 890, isToday: false },
  { day: 'Thu', steps: 6200,  calories: 490, isToday: false },
  { day: 'Fri', steps: 8432,  calories: 612, isToday: true  },
  { day: 'Sat', steps: 0,     calories: 0,   isToday: false },
  { day: 'Sun', steps: 0,     calories: 0,   isToday: false },
];

export const recentWorkouts: Workout[] = [
  { id: 1, name: 'Morning Run',          type: 'Cardio',      duration: '32 min', calories: 310, date: 'Today, 6:30 AM',      icon: '🏃' },
  { id: 2, name: 'Upper Body Strength',  type: 'Strength',    duration: '45 min', calories: 220, date: 'Yesterday, 7:00 PM',  icon: '🏋️' },
  { id: 3, name: 'Yoga & Stretch',       type: 'Flexibility', duration: '30 min', calories: 95,  date: 'Wed, 8:00 AM',        icon: '🧘' },
  { id: 4, name: 'HIIT Circuit',         type: 'Cardio',      duration: '25 min', calories: 280, date: 'Tue, 6:00 PM',        icon: '⚡' },
];

export const goals: Goal[] = [
  { id: 1, title: 'Weekly Workouts',  current: 4,  target: 5,  unit: 'sessions', icon: '🎯' },
  { id: 2, title: 'Monthly Distance', current: 38, target: 50, unit: 'km',       icon: '📍' },
  { id: 3, title: 'Weight Goal',      current: 3,  target: 5,  unit: 'kg lost',  icon: '⚖️' },
];

export const weeklySummary = {
  totalSteps:    '42,332',
  totalCalories: '3,291 kcal',
  activeDays:    '4 / 7',
};

export const MAX_STEPS = 12000;
export const MAX_CALORIES = 1000;
