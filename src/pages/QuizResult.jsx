import { useParams } from "react-router-dom";

export default function QuizResult() {
  const { quizId } = useParams();

  return (
    <div>
      <h2>Your Movie Match</h2>
      <p>Loading results for quiz ID: {quizId}</p>
    </div>
  );
}
