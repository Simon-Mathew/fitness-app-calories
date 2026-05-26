import "./DashboardHeader.css";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="dash-header">
      <div className="dash-header__left">
        <p className="dash-header__date">{today}</p>
        <h1 className="dash-header__title">Good morning, Simon 👋</h1>
        <p className="dash-header__subtitle">
          You're 84% towards your daily step goal — keep it up!
        </p>
      </div>

      <div className="dash-header__streak">
        <span className="dash-header__streak-flame">🔥</span>
        <span className="dash-header__streak-count">12</span>
        <span className="dash-header__streak-label">day streak</span>
      </div>
    </header>
  );
}
