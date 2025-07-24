import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import "../styles/QuizResult.css";


export default function QuizResult() {
  const { quizId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuiz(quizId)
      .then((res) => {
        setMovie(res.data.movie);
      })
      .catch((err) => {
        console.error("Error fetching quiz result:", err);
        setError("Could not load movie recommendation.");
      });
  }, [quizId]);

  if (error) {
   return (
    <PageWrapper>
        <p className="text-red-600 text-center">{error}</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Your Movie Match</h2>
      {movie ? (
        <div className="bg-indigo-100 p-6 rounded-lg shadow-md inline-block">
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
          <h3>{movie.title}</h3>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.release_year}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading movie match...</p>
        )}
      </div>
    </PageWrapper>
  );
}
