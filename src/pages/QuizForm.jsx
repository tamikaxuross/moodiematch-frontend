import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import "../styles/QuizForm.css";


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
      console.log("quiz_id:", response.data.quiz_id);
      console.log("movie:", response.data.movie);

      const quizId = response.data.quiz_id;

      // Redirect to result page using the quiz ID from the backend
      navigate(`/result/${quizId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <PageWrapper> 
      <div className="quiz-form-container">
        <h2 className="text-2xl font-bold mb-4 text-center">MoodieMatch Quiz</h2>
        <form onSubmit={handleSubmit} >
        {[
          "How are you feeling today?",
          "Do you want something funny or emotional?",
          "Do you want a fast-paced or slow story?",
        ].map((question, index) => (
          <div key={index}>
              <label className="block mb-1 font-semibold">{question}</label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Get My Moodie Match
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default QuizForm;
