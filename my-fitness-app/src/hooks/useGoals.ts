import { useEffect, useState } from 'react';
import { goalsApi } from '../api/goals';
import type { Goal } from '../types/fitness';
import type { ApiGoal } from '../types/api';

function toGoal(a: ApiGoal): Goal {
  return {
    id:      a._id,
    title:   a.title,
    icon:    a.icon,
    current: a.current,
    target:  a.target,
    unit:    a.unit,
  };
}

interface UseGoalsResult {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGoals(): UseGoalsResult {
  const [goals,   setGoals]   = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    goalsApi.getAll()
      .then(res => {
        if (!cancelled) setGoals(res.data.map(toGoal));
      })
      .catch(err => {
        if (!cancelled) setError((err as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [tick]);

  return { goals, loading, error, refetch: () => setTick(t => t + 1) };
}
