import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import "../styles/QuizForm.css";


const QuizForm = () => {
  
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(["", "", ""]);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = 1; 

    const questions = [
      "Where do you want the story to take place?",
      "What’s your current mood?",
      "Pick a color",
      "What kind of pace do you want?",
      "Pick a weather",
      "Pick a food vibe"
    ];

    const formattedAnswers = answers.map((answer, index) => ({
      question: questions[index],
      answer: answer
    }));


    try {
      const response = await createQuiz({ user_id, answers: formattedAnswers });
      navigate(`/result/${response.data.quiz_id}`);
    } catch (err) {
      console.error("Quiz error:", err);
      alert("Something went wrong. Try again.");
    }
  };


  const buttonThemes = {
    setting: ["forest", "city", "space", "beach"],
    mood: ["happy", "sad", "romantic", "scared"],
    color: ["red", "blue", "pink", "black"],
    pace: ["fast", "slow", "chaotic", "steady"],
    weather: ["sunny", "rainy", "cloudy", "stormy"],
    food: ["spicy", "sweet", "savory", "cold"]
  };

  const questionLabels = [
    "Where do you want the story to take place?",
    "What’s your current mood?",
    "Pick a color",
    "What kind of pace do you want?",
    "Pick a weather",
    "Pick a food vibe"
  ];

  const allOptions = Object.values(buttonThemes);


   

  return (
    <PageWrapper> 
      <div className="quiz-form-container max-w-2xl mx-auto py-6 px-4 bg-white rounded-xl shadow-xl border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">MoodieMatch Quiz</h2>
        <form onSubmit={handleSubmit}>
          {questionLabels.map((label, index) => (
            <div key={index} className="mb-6">
              <label className="block mb-3 font-semibold text-lg text-purple-800">{label}</label>
              <div className="flex flex-wrap gap-3">
                {allOptions[index].map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 py-2 rounded-full border transition duration-200
                      ${
                        answers[index] === option
                          ? "bg-pink-200 ring-2 ring-purple-500 text-purple-900 font-bold shadow-md"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    onClick={() => handleChange(index, option)}
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
