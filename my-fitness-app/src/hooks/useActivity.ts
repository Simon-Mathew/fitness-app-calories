import { useEffect, useState } from 'react';
import { activityApi } from '../api/activity';
import type { DayActivity } from '../types/fitness';
import type { ApiDailyActivity } from '../types/api';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Returns Mon–Sun of the current calendar week (ISO week: Mon = day 0). */
function getCurrentWeekDates(): Date[] {
  const today      = new Date();
  const dayOfWeek  = today.getDay();                      // 0 = Sun
  const monday     = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  );
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface ActivitySummary {
  totalCalories: string;
  activeDays:    string;
}

interface UseActivityResult {
  chartDays:    DayActivity[];
  todayRecord:  ApiDailyActivity | null;
  summary:      ActivitySummary;
  loading:      boolean;
  error:        string | null;
  refetch:      () => void;
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useActivity(): UseActivityResult {
  const [chartDays,   setChartDays]   = useState<DayActivity[]>([]);
  const [todayRecord, setTodayRecord] = useState<ApiDailyActivity | null>(null);
  const [summary,     setSummary]     = useState<ActivitySummary>({ totalCalories: '—', activeDays: '—' });
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [tick,        setTick]        = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    activityApi.getRecent(7)
      .then(res => {
        if (cancelled) return;

        const records   = res.data;
        const weekDates = getCurrentWeekDates();
        const today     = new Date();

        // Build chart: one entry per day of the current week
        const days: DayActivity[] = weekDates.map(date => {
          const record = records.find(r => isSameDay(new Date(r.date), date));
          return {
            day:      date.toLocaleDateString('en-US', { weekday: 'short' }),
            calories: record?.caloriesBurned ?? 0,
            isToday:  isSameDay(date, today),
          };
        });

        // Today's raw record (for stat cards)
        const todayRec = records.find(r => isSameDay(new Date(r.date), today)) ?? null;

        // Weekly summary
        const totalCal    = records.reduce((s, r) => s + r.caloriesBurned, 0);
        const activeDays  = records.filter(r => r.caloriesBurned > 0).length;

        setChartDays(days);
        setTodayRecord(todayRec);
        setSummary({
          totalCalories: `${totalCal.toLocaleString()} kcal`,
          activeDays:    `${activeDays} / 7`,
        });
      })
      .catch(err => {
        if (!cancelled) setError((err as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [tick]);

  return { chartDays, todayRecord, summary, loading, error, refetch: () => setTick(t => t + 1) };
}
