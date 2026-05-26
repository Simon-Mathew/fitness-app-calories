import { useEffect, useState } from 'react';
import { workoutsApi } from '../api/workouts';
import type { Workout } from '../types/fitness';
import type { ApiWorkout } from '../types/api';

// Derive an emoji from the workout type
const typeIconMap: Record<ApiWorkout['type'], string> = {
  Cardio:      '🏃',
  Strength:    '🏋️',
  Flexibility: '🧘',
  Sports:      '⚽',
  Other:       '💪',
};

function formatWorkoutDate(iso: string): string {
  const date   = new Date(iso);
  const today  = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  if (date.toDateString() === today.toDateString())     return `Today, ${time}`;
  if (date.toDateString() === yesterday.toDateString()) return `Yesterday, ${time}`;

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function toWorkout(a: ApiWorkout): Workout {
  return {
    id:       a._id,
    name:     a.name,
    type:     a.type as Workout['type'],
    duration: `${a.durationMinutes} min`,
    calories: a.caloriesBurned,
    date:     formatWorkoutDate(a.date),
    icon:     typeIconMap[a.type] ?? '💪',
  };
}

interface UseWorkoutsResult {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWorkouts(limit = 4): UseWorkoutsResult {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [tick,     setTick]     = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    workoutsApi.getAll(limit)
      .then(res => {
        if (!cancelled) setWorkouts(res.data.map(toWorkout));
      })
      .catch(err => {
        if (!cancelled) setError((err as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [limit, tick]);

  return { workouts, loading, error, refetch: () => setTick(t => t + 1) };
}
