import { NavLink } from "react-router-dom";
import "../styles/NavBar.css"; // make sure this file exists

export default function NavBar({ user }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Pastel Brand Name */}
        <div className="navbar-logo">MoodieMatch</div>

        {/* Nav Links */}
        <ul className="nav-links">
          <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
          <li><NavLink to="/quiz" className="nav-link">Quiz</NavLink></li>
          <li><NavLink to="/watchlist" className="nav-link">Watchlist</NavLink></li>
          <li><NavLink to="/start" className="nav-link">Login</NavLink></li>
        </ul>

        {user && (
          <div className="navbar-user">Welcome, {user}!</div>
        )}
      </div>
    </nav>
  );
}
