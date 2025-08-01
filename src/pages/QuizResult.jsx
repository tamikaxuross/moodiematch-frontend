import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import "../styles/QuizResult.css";


const QuizResults = () => {
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

  if (loading) return <p className="text-center text-purple-600 mt-10">Retrieving your magical Moodie Match...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;


  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg border border-purple-200">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">✨ Your Moodie Match ✨</h2>

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

          <h3 className="text-2xl font-semibold text-indigo-800 mb-2">{movie.title}</h3>
          <p className="text-gray-700 italic px-2">{movie.overview}</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default QuizResults;
