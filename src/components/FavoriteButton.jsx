import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, checkFavorite } from "../services/api";

const FavoriteButton = ({ user, movie, onFavoriteChange }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const result = await checkFavorite(user.id, movie.id);
        setIsFavorited(result.isFavorited);
      } catch (error) {
        console.error("Failed to check favorite status:", error);
      }
    };

    if (user?.id && movie?.id) {
      checkFavoriteStatus();
    }
  }, [user?.id, movie?.id]);

  const toggleFavorite = async () => {
    if (!user?.id || !movie) {
      alert("Please log in to add movies to your watchlist");
      return;
    }

    setLoading(true);
    try {
      if (isFavorited) {
        await removeFavorite({
          user_id: user.id,
          movie_id: movie.id
        });
        setIsFavorited(false);
        console.log("Removed from watchlist");
      } else {
        await addFavorite({
          user_id: user.id,
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || movie.poster?.replace('https://image.tmdb.org/t/p/w500', ''),
          overview: movie.overview,
          tmdb_id: movie.tmdb_id || movie.id
        });
        setIsFavorited(true);
        console.log("Added to watchlist");
      }
      
     
      if (onFavoriteChange) {
        onFavoriteChange(!isFavorited);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      if (error.response?.status === 409) {
        alert("This movie is already in your watchlist!");
      } else {
        alert("Failed to update watchlist. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`
        px-6 py-3 rounded-full font-semibold transition duration-200 text-lg
        ${isFavorited 
          ? 'bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-300' 
          : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-2 border-purple-300'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-md hover:shadow-lg'}
      `}
    >
      {loading ? (
        <>⏳ Loading...</>
      ) : isFavorited ? (
        <>❤️ Added to Watchlist</>
      ) : (
        <>🤍 Add to Watchlist</>
      )}
    </button>
  );
};

export default FavoriteButton;