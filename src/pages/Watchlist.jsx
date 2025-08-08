import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import "../styles/WatchList.css";

const Watchlist = ({ user: propUser }) => { // Accept user prop
  const [user, setUser] = useState(propUser);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const apiBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

  // Get user from localStorage if not passed as prop
  useEffect(() => {
    if (!propUser) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  // Fetch favorites when user is available
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    fetch(`${apiBase}/favorites/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load watchlist", err);
        setLoading(false);
      });
  }, [user?.id, apiBase]);

  const removeFromWatchlist = async (movie_id) => {
    if (!user?.id) return;
    
    try {
      const res = await fetch(`${apiBase}/favorites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, movie_id }),
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((movie) => movie.movie_id !== movie_id));
      }
    } catch (err) {
      console.error("Error deleting favorite", err);
    }
  };

  // Early return AFTER all hooks
  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Please log in first</h2>
          <p className="text-gray-600 mb-4">You need to log in to view your watchlist.</p>
          <button 
            onClick={() => window.location.href = "/start"}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
          >
            Go to Login
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper>
        <p className="text-center mt-10">Loading your watchlist...</p>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="watchlist-container">
        <h2 className="watchlist-title">Your Watchlist</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back, {user.username}! Here are your saved movies.
        </p>

        {favorites.length === 0 ? (
          <p className="watchlist-empty">Your watchlist is empty.</p>
        ) : (
          <div className="watchlist-grid">
            {favorites.map((movie) => (
              <div key={movie.id} className="watchlist-card">
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="watchlist-poster"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x450/f3e8ff/7c3aed?text=No+Poster";
                  }}
                />
                <p className="watchlist-movie-title">{movie.title}</p>
                <button
                  onClick={() => removeFromWatchlist(movie.movie_id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Watchlist;