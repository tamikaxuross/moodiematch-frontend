import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import "../styles/WatchList.css";

const Watchlist = ({ user }) => { // Accept user prop
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id; // Safe access to user ID
  const apiBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

  // useEffect MUST come before any early returns
  useEffect(() => {
    if (!user || !userId) {
      setLoading(false);
      return;
    }

    fetch(`${apiBase}/favorites/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load watchlist", err);
        setLoading(false);
      });
  }, [user, userId, apiBase]);

  // Early return AFTER all hooks
  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Please log in first</h2>
          <p className="text-gray-600 mb-4">You need to log in to view your watchlist.</p>
        </div>
      </PageWrapper>
    );
  }

  const removeFromWatchlist = async (movie_id) => {
    try {
      const res = await fetch(`${apiBase}/favorites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, movie_id }),
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((movie) => movie.movie_id !== movie_id));
      }
    } catch (err) {
      console.error("Error deleting favorite", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your watchlist...</p>;

  return (
    <PageWrapper>
      <div className="watchlist-container">
        <h2 className="watchlist-title">Your Watchlist</h2>
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