import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar__brand">💪 FitTrack</span>
      <div className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/nutrition"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Nutrition
        </NavLink>
      </div>
    </nav>
  );
}
