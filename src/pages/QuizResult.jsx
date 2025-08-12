import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../services/api";
import FavoriteButton from "../components/FavoriteButton";
import "../styles/QuizResult.css";

const QuizResults = ({ user: propUser }) => {
  // Get user from localStorage since it's not being passed as prop consistently
  const [user, setUser] = useState(propUser);
  
  useEffect(() => {
    if (!propUser) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user:", error);
        }
      }
    } else {
      setUser(propUser);
    }
  }, [propUser]);
  const { quizId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getQuiz(quizId);
        
        // If we have multiple movies, use them; otherwise create array with single movie
        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else if (data.movie) {
          setMovies([data.movie]);
        } else {
          setError("No movie recommendations found.");
        }
      } catch (err) {
        console.error("Error fetching quiz result:", err);
        setError("Oops! We couldn't fetch your Moodie Match.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [quizId]);

  const handleFavoriteChange = (movieTitle, isFavorited) => {
    if (isFavorited) {
      console.log(`🎉 ${movieTitle} added to watchlist!`);
    } else {
      console.log(`👋 ${movieTitle} removed from watchlist`);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-center text-purple-600 text-xl">🎬 Finding your perfect Moodie Matches...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-center text-red-600 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="quiz-results-container">
      <div className="quiz-results-wrapper">
        {/* Header */}
        <div className="quiz-results-header">
          <h1 className="quiz-results-title">
            ✨ Your Moodie Matches ✨
          </h1>
          <p className="quiz-results-subtitle">
            {user ? `Hey ${user.username}! ` : ""}Here are some perfect movies for your current mood
          </p>
        </div>

        {/* Movies Grid */}
        <div className="movies-grid-centered">
          {movies.map((movie, index) => (
            <div 
              key={movie.id || index} 
              className="movie-card-enhanced"
            >
              {/* Movie Poster */}
              <div className="relative">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={`Poster for ${movie.title}`}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center text-purple-400">
                      <div className="text-4xl mb-2">🎬</div>
                      <div className="text-sm">No poster available</div>
                    </div>
                  </div>
                )}
                
                {/* Genre Badge */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {movie.genres[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {movie.title}
                </h3>
                
                {/* Rating and Year */}
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  {movie.vote_average && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  {movie.release_date && (
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genres.slice(0, 3).map((genre, idx) => (
                      <span 
                        key={idx}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {movie.overview || "No description available."}
                </p>

                {/* Favorite Button */}
                <div className="flex justify-center">
                  <FavoriteButton 
                    user={user} 
                    movie={movie}
                    onFavoriteChange={(isFavorited) => handleFavoriteChange(movie.title, isFavorited)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.location.href = "/quiz"}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            🎭 Take Another Quiz
          </button>
          
          <button 
            onClick={() => window.location.href = "/watchlist"}
            className="px-8 py-3 bg-white text-purple-700 border-2 border-purple-300 rounded-full hover:bg-purple-50 transition duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            📋 View My Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;