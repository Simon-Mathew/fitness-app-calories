import type { StatCardData } from '../../types/fitness';
import './StatsGrid.css';

// ── Single card ────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: StatCardData }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__icon">{stat.icon}</span>
        <span className="stat-card__label">{stat.label}</span>
      </div>

      <div className="stat-card__value-row">
        <span className="stat-card__value">{stat.value}</span>
        <span className="stat-card__unit">{stat.unit}</span>
      </div>

      <div className="stat-card__progress-track">
        <div
          className="stat-card__progress-fill"
          style={{ width: `${stat.progress}%`, background: stat.color }}
        />
      </div>

      <div className="stat-card__footer">
        <span className="stat-card__pct">{stat.progress}% of goal</span>
        <span className="stat-card__goal">Goal: {stat.goal}</span>
      </div>
    </div>
  );
}

// ── Grid ───────────────────────────────────────────────────────────────────

interface StatsGridProps {
  stats: StatCardData[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="stats-section">
      <h2 className="stats-section__title">Today's Stats</h2>
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
