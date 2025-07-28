import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import "../styles/QuizForm.css";


const QuizForm = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  
  const questions = [
    {
      key: "setting",
      label: "Where do you want the story to take place?",
      options: ["forest", "city", "space", "beach"]
    },
    {
      key: "mood",
      label: "What’s your current mood?",
      options: ["happy", "sad", "romantic", "scared"]
    },
    {
      key: "color",
      label: "Pick a color",
      options: ["red", "blue", "pink", "black"]
    },
    {
      key: "pace",
      label: "What kind of pace do you want?",
      options: ["fast", "slow", "chaotic", "steady"]
    },
    {
      key: "weather",
      label: "Pick a weather",
      options: ["sunny", "rainy", "cloudy", "stormy"]
    },
    {
      key: "food",
      label: "Pick a food vibe",
      options: ["spicy", "sweet", "savory", "cold"]
    }
  ];

  const handleChange = (key, value) => {
  setAnswers(prev => ({ ...prev, [key]: value }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = 1; 
    const formattedAnswers = questions.map((q) => ({
      question: q.label,
      answer: answers[q.key] || ""
    }));


    try {
      const response = await createQuiz({ user_id, answers: formattedAnswers });
      navigate(`/result/${response.data.quiz_id}`);
    } catch (err) {
      console.error("Quiz error:", err);
      alert("Something went wrong. Try again.");
    }
  };


  

  return (
    <PageWrapper> 
      <div className="quiz-form-container max-w-2xl mx-auto py-6 px-4 bg-white rounded-xl shadow-xl border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">MoodieMatch Quiz</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div key={q.key} className="mb-6">
              <label className="block mb-3 font-semibold text-lg text-purple-800">{q.label}</label>
              <div className="flex flex-wrap gap-3">
                {q.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 py-2 rounded-full border transition duration-200
                      ${
                        answers[q.key] === option
                          ? "bg-pink-200 ring-2 ring-purple-500 text-purple-900 font-bold shadow-md"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    onClick={() => handleChange(q.key, option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-4 rounded-full shadow-md hover:shadow-lg transition text-lg font-semibold"
          >
            🎬 Reveal My Moodie Match
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};


export default QuizForm;
