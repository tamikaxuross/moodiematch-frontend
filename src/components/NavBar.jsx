import { Link } from "react-router-dom";

export default function NavBar({ user }) {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <ul className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/start">Start</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
        </div>
        {user && <li className="italic">Welcome, {user}!</li>}
      </ul>
    </nav>
  );
}
