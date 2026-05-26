import { useState } from 'react';
import { useFoodLog }   from '../../hooks/useFoodLog';
import Spinner          from '../shared/Spinner';
import ErrorMessage     from '../shared/ErrorMessage';
import DateNav          from './DateNav';
import DailySummary     from './DailySummary';
import MealSection      from './MealSection';
import { MEALS }        from './constants';
import { toDateString } from './dateUtils';
import type { MealType } from './constants';
import './FoodLog.css';

export default function FoodLog() {
  const [dateStr, setDateStr] = useState(toDateString(new Date()));

  const { entries, loading, error, addEntry, deleteEntry, refetch } = useFoodLog(dateStr);

  const shiftDay = (delta: number) => {
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    setDateStr(toDateString(d));
  };

  const byMeal = (meal: MealType) => entries.filter(e => e.mealType === meal);
  const isToday = dateStr === toDateString(new Date());

  return (
    <div className="food-log">

      <DateNav
        dateStr={dateStr}
        isToday={isToday}
        onPrev={() => shiftDay(-1)}
        onNext={() => shiftDay(1)}
      />

      {loading ? (
        <Spinner message="Loading food log…" />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <DailySummary entries={entries} />

          <div className="food-log__meals">
            {MEALS.map(meal => (
              <MealSection
                key={meal.type}
                meal={meal}
                entries={byMeal(meal.type)}
                dateStr={dateStr}
                onAdd={addEntry}
                onDelete={deleteEntry}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
