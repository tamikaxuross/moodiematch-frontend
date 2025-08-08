import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import FavoriteButton from "../components/FavoriteButton";
import "../styles/QuizResult.css";


const QuizResults = ({ user: propUser }) => {
  // Get user from localStorage if not passed as prop, with fallback handling
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
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getQuiz(quizId);
        setMovie(data.movie);
      } catch (err) {
        console.error("Error fetching quiz result:", err);
        setError("Oops! We couldn't fetch your Moodie Match.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [quizId]);

  const handleFavoriteChange = (isFavorited) => {
    if (isFavorited) {
      // Show success message or update UI
      console.log(`🎉 ${movie.title} added to watchlist!`);
    } else {
      console.log(`👋 ${movie.title} removed from watchlist`);
    }
  };


  if (loading) return <p className="text-center text-purple-600 mt-10">Retrieving your magical Moodie Match...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;


  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-600">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 text-center mb-6">✨ Your Moodie Match ✨</h2>

        <div className="flex flex-col items-center text-center">
          {movie.poster ? (
            <img
              src={movie.poster}
             alt={`Poster for ${movie.title}`}
              className="rounded-lg shadow-md mb-4 max-w-xs"
            />
          ) : (
            <div className="w-64 h-96 bg-purple-100 rounded-lg shadow-md mb-4 flex items-center justify-center text-purple-400 italic">
              No poster available
            </div>
          )}

          <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-300 mb-2">{movie.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 italic px-2 mb-6 max-w-lg">{movie.overview}</p>

           <div className="space-y-4">
            <FavoriteButton 
              user={user} 
              movie={movie}
              onFavoriteChange={handleFavoriteChange}
            />
            
           
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => window.location.href = "/quiz"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                🎭 Take Another Quiz
              </button>
              
              <button 
                onClick={() => window.location.href = "/watchlist"}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
              >
                📋 View My Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>

  );
};

export default QuizResults;
