import { useState } from 'react';
import './Dashboard.css';

// ── Types ──────────────────────────────────────────────────────────────────

interface StatCard {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  progress: number; // 0-100
  goal: string;
  color: string;
}

interface Workout {
  id: number;
  name: string;
  type: string;
  duration: string;
  calories: number;
  date: string;
  icon: string;
}

interface DayActivity {
  day: string;
  steps: number;
  calories: number;
  active: boolean; // is today
}

interface Goal {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  {
    id: 'steps',
    label: 'Steps',
    value: '8,432',
    unit: 'steps',
    icon: '👟',
    progress: 84,
    goal: '10,000',
    color: 'var(--accent)',
  },
  {
    id: 'calories',
    label: 'Calories Burned',
    value: '612',
    unit: 'kcal',
    icon: '🔥',
    progress: 71,
    goal: '860 kcal',
    color: '#f97316',
  },
  {
    id: 'active',
    label: 'Active Time',
    value: '47',
    unit: 'min',
    icon: '⏱️',
    progress: 63,
    goal: '75 min',
    color: '#22c55e',
  },
  {
    id: 'water',
    label: 'Water Intake',
    value: '1.8',
    unit: 'L',
    icon: '💧',
    progress: 60,
    goal: '3 L',
    color: '#38bdf8',
  },
];

const weekActivity: DayActivity[] = [
  { day: 'Mon', steps: 9200, calories: 720, active: false },
  { day: 'Tue', steps: 7500, calories: 580, active: false },
  { day: 'Wed', steps: 11000, calories: 890, active: false },
  { day: 'Thu', steps: 6200, calories: 490, active: false },
  { day: 'Fri', steps: 8432, calories: 612, active: true },
  { day: 'Sat', steps: 0, calories: 0, active: false },
  { day: 'Sun', steps: 0, calories: 0, active: false },
];

const recentWorkouts: Workout[] = [
  {
    id: 1,
    name: 'Morning Run',
    type: 'Cardio',
    duration: '32 min',
    calories: 310,
    date: 'Today, 6:30 AM',
    icon: '🏃',
  },
  {
    id: 2,
    name: 'Upper Body Strength',
    type: 'Strength',
    duration: '45 min',
    calories: 220,
    date: 'Yesterday, 7:00 PM',
    icon: '🏋️',
  },
  {
    id: 3,
    name: 'Yoga & Stretch',
    type: 'Flexibility',
    duration: '30 min',
    calories: 95,
    date: 'Wed, 8:00 AM',
    icon: '🧘',
  },
  {
    id: 4,
    name: 'HIIT Circuit',
    type: 'Cardio',
    duration: '25 min',
    calories: 280,
    date: 'Tue, 6:00 PM',
    icon: '⚡',
  },
];

const goals: Goal[] = [
  { id: 1, title: 'Weekly Workouts', current: 4, target: 5, unit: 'sessions', icon: '🎯' },
  { id: 2, title: 'Monthly Distance', current: 38, target: 50, unit: 'km', icon: '📍' },
  { id: 3, title: 'Weight Goal', current: 3, target: 5, unit: 'kg lost', icon: '⚖️' },
];

const MAX_STEPS = 12000;

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCardItem({ stat }: { stat: StatCard }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">{stat.icon}</div>
      <div className="stat-card__content">
        <span className="stat-card__label">{stat.label}</span>
        <div className="stat-card__value-row">
          <span className="stat-card__value">{stat.value}</span>
          <span className="stat-card__unit">{stat.unit}</span>
        </div>
        <div className="stat-card__progress-track">
          <div
            className="stat-card__progress-fill"
            style={{
              width: `${stat.progress}%`,
              background: stat.color,
            }}
          />
        </div>
        <span className="stat-card__goal">Goal: {stat.goal}</span>
      </div>
    </div>
  );
}

function ActivityBar({ day }: { day: DayActivity }) {
  const heightPct = Math.round((day.steps / MAX_STEPS) * 100);
  return (
    <div className={`activity-bar ${day.active ? 'activity-bar--active' : ''}`}>
      <div className="activity-bar__track">
        <div
          className="activity-bar__fill"
          style={{ height: `${heightPct}%` }}
          title={day.steps ? `${day.steps.toLocaleString()} steps` : 'No data'}
        />
      </div>
      <span className="activity-bar__label">{day.day}</span>
    </div>
  );
}

function WorkoutRow({ workout }: { workout: Workout }) {
  return (
    <div className="workout-row">
      <div className="workout-row__icon">{workout.icon}</div>
      <div className="workout-row__info">
        <span className="workout-row__name">{workout.name}</span>
        <span className="workout-row__meta">
          <span className={`workout-row__type workout-row__type--${workout.type.toLowerCase()}`}>
            {workout.type}
          </span>
          · {workout.date}
        </span>
      </div>
      <div className="workout-row__stats">
        <span className="workout-row__duration">{workout.duration}</span>
        <span className="workout-row__calories">{workout.calories} kcal</span>
      </div>
    </div>
  );
}

function GoalItem({ goal }: { goal: Goal }) {
  const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
  return (
    <div className="goal-item">
      <div className="goal-item__header">
        <span className="goal-item__icon">{goal.icon}</span>
        <span className="goal-item__title">{goal.title}</span>
        <span className="goal-item__fraction">
          {goal.current}/{goal.target} {goal.unit}
        </span>
      </div>
      <div className="goal-item__track">
        <div className="goal-item__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="goal-item__pct">{pct}%</span>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'steps' | 'calories'>('steps');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard__header">
        <div className="dashboard__greeting">
          <p className="dashboard__date">{today}</p>
          <h1 className="dashboard__title">Good morning, Simon 👋</h1>
          <p className="dashboard__subtitle">You're 84% towards your daily step goal. Keep it up!</p>
        </div>
        <div className="dashboard__streak">
          <span className="streak__flame">🔥</span>
          <span className="streak__count">12</span>
          <span className="streak__label">day streak</span>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="dashboard__section">
        <h2 className="section-title">Today's Stats</h2>
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCardItem key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* Weekly Activity */}
      <section className="dashboard__section">
        <div className="section-header">
          <h2 className="section-title">Weekly Activity</h2>
          <div className="tab-toggle">
            <button
              className={`tab-btn ${activeTab === 'steps' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('steps')}
            >
              Steps
            </button>
            <button
              className={`tab-btn ${activeTab === 'calories' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('calories')}
            >
              Calories
            </button>
          </div>
        </div>
        <div className="activity-chart">
          {weekActivity.map((day) => (
            <ActivityBar key={day.day} day={day} />
          ))}
        </div>
        <div className="activity-summary">
          <div className="activity-summary__item">
            <span className="activity-summary__value">42,332</span>
            <span className="activity-summary__label">Total steps this week</span>
          </div>
          <div className="activity-summary__divider" />
          <div className="activity-summary__item">
            <span className="activity-summary__value">3,291 kcal</span>
            <span className="activity-summary__label">Total calories burned</span>
          </div>
          <div className="activity-summary__divider" />
          <div className="activity-summary__item">
            <span className="activity-summary__value">4 / 7</span>
            <span className="activity-summary__label">Active days</span>
          </div>
        </div>
      </section>

      {/* Bottom Grid: Workouts + Goals */}
      <div className="dashboard__bottom-grid">
        {/* Recent Workouts */}
        <section className="dashboard__section dashboard__section--card">
          <div className="section-header">
            <h2 className="section-title">Recent Workouts</h2>
            <button className="link-btn">View all →</button>
          </div>
          <div className="workout-list">
            {recentWorkouts.map((w) => (
              <WorkoutRow key={w.id} workout={w} />
            ))}
          </div>
        </section>

        {/* Goals */}
        <section className="dashboard__section dashboard__section--card">
          <div className="section-header">
            <h2 className="section-title">Goals</h2>
            <button className="link-btn">Edit →</button>
          </div>
          <div className="goals-list">
            {goals.map((g) => (
              <GoalItem key={g.id} goal={g} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="quick-actions__title">Quick Log</h3>
            <div className="quick-actions__grid">
              <button className="quick-action-btn">
                <span>🏃</span> Log Run
              </button>
              <button className="quick-action-btn">
                <span>💧</span> Add Water
              </button>
              <button className="quick-action-btn">
                <span>🍎</span> Log Meal
              </button>
              <button className="quick-action-btn">
                <span>😴</span> Log Sleep
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
