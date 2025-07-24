import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/api";

const QuizForm = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = 1; 

    try {
      const response = await createQuiz({ user_id, answers });
      const quizId = response.data.quiz_id;

      // Redirect to result page using the quiz ID from the backend
      navigate(`/result/${quizId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>MoodieMatch Quiz</h2>
      <form onSubmit={handleSubmit}>
        {[
          "How are you feeling today?",
          "Do you want something funny or emotional?",
          "Do you want a fast-paced or slow story?",
        ].map((question, index) => (
          <div key={index}>
            <label>{question}</label>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit">Get My Moodie Match</button>
      </form>
    </div>
  );
};

export default QuizForm;
