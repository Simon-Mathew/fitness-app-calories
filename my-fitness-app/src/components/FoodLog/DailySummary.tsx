import type { ApiFoodEntry } from '../../types/api';
import { CALORIE_GOAL, MACRO_GOALS } from './constants';
import './DailySummary.css';

interface DailySummaryProps {
  entries: ApiFoodEntry[];
}

export default function DailySummary({ entries }: DailySummaryProps) {
  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein:  acc.protein  + e.protein,
      carbs:    acc.carbs    + e.carbs,
      fat:      acc.fat      + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const calPct    = Math.min(Math.round((totals.calories / CALORIE_GOAL) * 100), 100);
  const remaining = Math.max(CALORIE_GOAL - totals.calories, 0);

  const macros = [
    { label: 'Protein', value: totals.protein, goal: MACRO_GOALS.protein, color: '#a855f7' },
    { label: 'Carbs',   value: totals.carbs,   goal: MACRO_GOALS.carbs,   color: '#f97316' },
    { label: 'Fat',     value: totals.fat,      goal: MACRO_GOALS.fat,     color: '#38bdf8' },
  ];

  return (
    <div className="daily-summary">

      {/* Calorie ring + labels */}
      <div className="daily-summary__calories">
        <div className="daily-summary__ring-wrap">
          <svg viewBox="0 0 80 80" className="daily-summary__ring">
            <circle cx="40" cy="40" r="34" className="daily-summary__ring-track" />
            <circle
              cx="40" cy="40" r="34"
              className="daily-summary__ring-fill"
              strokeDasharray={`${calPct * 2.136} 213.6`}
              transform="rotate(-90 40 40)"
            />
          </svg>
          <div className="daily-summary__ring-center">
            <span className="daily-summary__ring-value">{totals.calories}</span>
            <span className="daily-summary__ring-unit">kcal</span>
          </div>
        </div>

        <div className="daily-summary__cal-labels">
          <p className="daily-summary__goal-line">
            Goal: <strong>{CALORIE_GOAL} kcal</strong>
          </p>
          <p className="daily-summary__remaining">
            {remaining > 0
              ? <><strong>{remaining} kcal</strong> remaining</>
              : <span className="daily-summary__reached">Goal reached 🎉</span>
            }
          </p>
        </div>
      </div>

      {/* Macro bars */}
      <div className="daily-summary__macros">
        {macros.map(m => {
          const pct = Math.min(Math.round((m.value / m.goal) * 100), 100);
          return (
            <div key={m.label} className="daily-summary__macro">
              <div className="daily-summary__macro-header">
                <span className="daily-summary__macro-name">{m.label}</span>
                <span className="daily-summary__macro-value">
                  {m.value}g
                  <span className="daily-summary__macro-goal"> / {m.goal}g</span>
                </span>
              </div>
              <div className="daily-summary__macro-track">
                <div
                  className="daily-summary__macro-fill"
                  style={{ width: `${pct}%`, background: m.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
