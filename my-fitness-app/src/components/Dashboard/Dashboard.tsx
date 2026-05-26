import { useWorkouts }    from '../../hooks/useWorkouts';
import { useGoals }       from '../../hooks/useGoals';
import { useActivity }    from '../../hooks/useActivity';
import { buildDailyStats } from '../../hooks/useDailyStats';

import DashboardHeader  from '../DashboardHeader/DashboardHeader';
import StatsGrid        from '../StatsGrid/StatsGrid';
import ActivityChart    from '../ActivityChart/ActivityChart';
import RecentWorkouts   from '../RecentWorkouts/RecentWorkouts';
import Goals            from '../Goals/Goals';
import QuickLog         from '../QuickLog/QuickLog';
import Spinner          from '../shared/Spinner';
import ErrorMessage     from '../shared/ErrorMessage';

import './Dashboard.css';

export default function Dashboard() {
  const workoutsResult = useWorkouts(4);
  const goalsResult    = useGoals();
  const activityResult = useActivity();

  const dailyStats = buildDailyStats(activityResult.todayRecord);

  return (
    <div className="dashboard">
      <DashboardHeader />

      {/* ── Today's Stats ───────────────────────────────────── */}
      {activityResult.loading ? (
        <Spinner message="Loading today's stats…" />
      ) : activityResult.error ? (
        <ErrorMessage message={activityResult.error} onRetry={activityResult.refetch} />
      ) : (
        <StatsGrid stats={dailyStats} />
      )}

      {/* ── Weekly Activity Chart ────────────────────────────── */}
      {activityResult.loading ? null : activityResult.error ? null : (
        <ActivityChart
          days={activityResult.chartDays}
          totalCalories={activityResult.summary.totalCalories}
          activeDays={activityResult.summary.activeDays}
        />
      )}

      {/* ── Workouts + Goals side-by-side ────────────────────── */}
      <div className="dashboard__columns">

        {/* Workouts */}
        {workoutsResult.loading ? (
          <div className="dashboard__panel-shell">
            <Spinner message="Loading workouts…" />
          </div>
        ) : workoutsResult.error ? (
          <div className="dashboard__panel-shell">
            <ErrorMessage message={workoutsResult.error} onRetry={workoutsResult.refetch} />
          </div>
        ) : (
          <RecentWorkouts workouts={workoutsResult.workouts} />
        )}

        {/* Goals + Quick Log */}
        <div className="dashboard__right-col">
          {goalsResult.loading ? (
            <div className="dashboard__panel-shell">
              <Spinner message="Loading goals…" />
            </div>
          ) : goalsResult.error ? (
            <div className="dashboard__panel-shell">
              <ErrorMessage message={goalsResult.error} onRetry={goalsResult.refetch} />
            </div>
          ) : (
            <Goals goals={goalsResult.goals} />
          )}

          <QuickLog />
        </div>
      </div>
    </div>
  );
}
