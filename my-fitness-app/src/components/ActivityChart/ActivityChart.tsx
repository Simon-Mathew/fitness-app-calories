import type { DayActivity } from '../../types/fitness';
import './ActivityChart.css';

const MAX_CALORIES = 1000;

// ── Single bar ─────────────────────────────────────────────────────────────

function Bar({ day }: { day: DayActivity }) {
  const heightPct = day.calories > 0
    ? Math.round((day.calories / MAX_CALORIES) * 100)
    : 0;
  const tooltip = day.calories > 0
    ? `${day.calories.toLocaleString()} kcal`
    : 'No data';

  return (
    <div className={`ac-bar ${day.isToday ? 'ac-bar--today' : ''}`}>
      <span className="ac-bar__value">
        {day.calories > 0 ? `${day.calories}` : '—'}
      </span>
      <div className="ac-bar__track">
        <div
          className="ac-bar__fill"
          style={{ height: `${heightPct}%` }}
          title={tooltip}
        />
      </div>
      <span className="ac-bar__day">{day.day}</span>
    </div>
  );
}

// ── Summary strip ──────────────────────────────────────────────────────────

interface SummaryItem { value: string; label: string; }

function SummaryRow({ items }: { items: SummaryItem[] }) {
  return (
    <div className="ac-summary">
      {items.map((item, i) => (
        <>
          <div key={item.label} className="ac-summary__item">
            <span className="ac-summary__value">{item.value}</span>
            <span className="ac-summary__label">{item.label}</span>
          </div>
          {i < items.length - 1 && (
            <div key={`div-${i}`} className="ac-summary__divider" />
          )}
        </>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

interface ActivityChartProps {
  days: DayActivity[];
  totalCalories: string;
  activeDays: string;
}

export default function ActivityChart({ days, totalCalories, activeDays }: ActivityChartProps) {
  const summaryItems: SummaryItem[] = [
    { value: totalCalories, label: 'Calories burned' },
    { value: activeDays,    label: 'Active days'     },
  ];

  return (
    <section className="ac-section">
      <div className="ac-section__header">
        <div>
          <h2 className="ac-section__title">Weekly Activity</h2>
          <p className="ac-section__subtitle">Calories burned across the past 7 days</p>
        </div>
      </div>

      <div className="ac-chart">
        {days.map((day) => (
          <Bar key={day.day} day={day} />
        ))}
      </div>

      <SummaryRow items={summaryItems} />
    </section>
  );
}
