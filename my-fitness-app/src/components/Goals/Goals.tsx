import type { Goal } from '../../types/fitness';
import './Goals.css';

// ── Single goal ────────────────────────────────────────────────────────────

function GoalItem({ goal }: { goal: Goal }) {
  const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);

  return (
    <div className="goal-item">
      <div className="goal-item__header">
        <span className="goal-item__icon">{goal.icon}</span>
        <div className="goal-item__text">
          <span className="goal-item__title">{goal.title}</span>
          <span className="goal-item__fraction">
            {goal.current} / {goal.target} {goal.unit}
          </span>
        </div>
        <span className="goal-item__pct">{pct}%</span>
      </div>

      <div className="goal-item__track">
        <div className="goal-item__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────

interface GoalsProps {
  goals: Goal[];
}

export default function Goals({ goals }: GoalsProps) {
  return (
    <section className="goals-panel">
      <div className="goals-panel__header">
        <div>
          <h2 className="goals-panel__title">Goals</h2>
          <p className="goals-panel__subtitle">Track your long-term targets</p>
        </div>
        <button className="goals-panel__link">Edit →</button>
      </div>

      <div className="goals-panel__list">
        {goals.map((g) => (
          <GoalItem key={g.id} goal={g} />
        ))}
      </div>
    </section>
  );
}
