import { useCallback, useEffect, useState } from 'react';
import { foodApi, type NewFoodEntry } from '../api/food';
import type { ApiFoodEntry } from '../types/api';

interface UseFoodLogResult {
  entries:     ApiFoodEntry[];
  loading:     boolean;
  error:       string | null;
  addEntry:    (data: NewFoodEntry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  refetch:     () => void;
}

export function useFoodLog(date: string): UseFoodLogResult {
  const [entries, setEntries] = useState<ApiFoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    foodApi.getByDate(date)
      .then(res => { if (!cancelled) setEntries(res.data); })
      .catch(err => { if (!cancelled) setError((err as Error).message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [date, tick]);

  const addEntry = useCallback(async (data: NewFoodEntry) => {
    const res = await foodApi.create(data);
    setEntries(prev => [...prev, res.data]);
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    await foodApi.remove(id);
    setEntries(prev => prev.filter(e => e._id !== id));
  }, []);

  return {
    entries,
    loading,
    error,
    addEntry,
    deleteEntry,
    refetch: () => setTick(t => t + 1),
  };
}
