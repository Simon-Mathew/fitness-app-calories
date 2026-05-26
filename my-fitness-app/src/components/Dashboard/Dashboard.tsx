import { stats, weekActivity, recentWorkouts, goals, weeklySummary } from '../../data/mockData';

import DashboardHeader  from '../DashboardHeader/DashboardHeader';
import StatsGrid        from '../StatsGrid/StatsGrid';
import ActivityChart    from '../ActivityChart/ActivityChart';
import RecentWorkouts   from '../RecentWorkouts/RecentWorkouts';
import Goals            from '../Goals/Goals';
import QuickLog         from '../QuickLog/QuickLog';

import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <DashboardHeader />

      <StatsGrid stats={stats} />

      <ActivityChart
        days={weekActivity}
        totalCalories={weeklySummary.totalCalories}
        activeDays={weeklySummary.activeDays}
      />

      <div className="dashboard__columns">
        <RecentWorkouts workouts={recentWorkouts} />
        <div className="dashboard__right-col">
          <Goals goals={goals} />
          <QuickLog />
        </div>
      </div>
    </div>
  );
}
