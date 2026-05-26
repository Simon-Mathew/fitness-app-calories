import type { ApiDailyActivity } from '../types/api';
import type { StatCardData } from '../types/fitness';

// Daily targets — can be made user-configurable later
const GOALS = {
  calories:      860,
  activeMinutes: 75,
  waterLitres:   3,
};

function pct(value: number, goal: number): number {
  return Math.min(Math.round((value / goal) * 100), 100);
}

/**
 * Derives the three stat cards from today's activity record.
 * Pass `null` while the record is still loading — values will show 0.
 */
export function buildDailyStats(record: ApiDailyActivity | null): StatCardData[] {
  const cal   = record?.caloriesBurned ?? 0;
  const mins  = record?.activeMinutes  ?? 0;
  const water = record?.waterLitres    ?? 0;

  return [
    {
      id:       'calories',
      label:    'Calories Burned',
      value:    cal,
      unit:     'kcal',
      icon:     '🔥',
      progress: pct(cal,   GOALS.calories),
      goal:     `${GOALS.calories} kcal`,
      color:    '#f97316',
    },
    {
      id:       'active',
      label:    'Active Time',
      value:    mins,
      unit:     'min',
      icon:     '⏱️',
      progress: pct(mins,  GOALS.activeMinutes),
      goal:     `${GOALS.activeMinutes} min`,
      color:    '#22c55e',
    },
    {
      id:       'water',
      label:    'Water Intake',
      value:    water % 1 === 0 ? water : water.toFixed(1),
      unit:     'L',
      icon:     '💧',
      progress: pct(water, GOALS.waterLitres),
      goal:     `${GOALS.waterLitres} L`,
      color:    '#38bdf8',
    },
  ];
}
