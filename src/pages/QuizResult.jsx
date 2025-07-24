import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../services/api";
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

  if (error) return <p>{error}</p>;

  return (
    <div className="result-container">
      <h2>Your Movie Match</h2>
      {movie ? (
        <div>
          <h3>{movie.title}</h3>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.release_year}</p>
        </div>
      ) : (
        <p>Loading movie match...</p>
      )}
    </div>
  );
}
