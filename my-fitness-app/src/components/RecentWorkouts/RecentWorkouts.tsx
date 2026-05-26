import type { Workout } from '../../types/fitness';
import './RecentWorkouts.css';

// ── Single row ─────────────────────────────────────────────────────────────

function WorkoutRow({ workout }: { workout: Workout }) {
  return (
    <div className="workout-row">
      <div className="workout-row__icon">{workout.icon}</div>

      <div className="workout-row__info">
        <span className="workout-row__name">{workout.name}</span>
        <span className="workout-row__meta">
          <span className={`workout-row__badge workout-row__badge--${workout.type.toLowerCase()}`}>
            {workout.type}
          </span>
          <span className="workout-row__dot">·</span>
          {workout.date}
        </span>
      </div>

      <div className="workout-row__stats">
        <span className="workout-row__duration">{workout.duration}</span>
        <span className="workout-row__calories">{workout.calories} kcal</span>
      </div>
    </div>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────

interface RecentWorkoutsProps {
  workouts: Workout[];
}

export default function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  return (
    <section className="rw-panel">
      <div className="rw-panel__header">
        <div>
          <h2 className="rw-panel__title">Recent Workouts</h2>
          <p className="rw-panel__subtitle">{workouts.length} sessions logged</p>
        </div>
        <button className="rw-panel__link">View all →</button>
      </div>

      <div className="rw-panel__list">
        {workouts.map((w) => (
          <WorkoutRow key={w.id} workout={w} />
        ))}
      </div>
    </section>
  );
}
