import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/api";
import PageWrapper from "../components/PageWrapper";
import "../styles/QuizForm.css";

const QuizForm = ({ user }) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Check if user is logged in
  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Please log in first</h2>
          <p className="text-gray-600 mb-4">You need to create an account to take the quiz.</p>
          <button 
            onClick={() => navigate("/start")}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
          >
            Go to Login
          </button>
        </div>
      </PageWrapper>
    );
  }
  
  const questions = [
    {
      key: "setting",
      label: "Where do you want the story to take place?",
      options: ["forest", "city", "space", "beach"]
    },
    {
      key: "mood",
      label: "What's your current mood?",
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
    
    // Validate all questions answered
    const unanswered = questions.filter(q => !answers[q.key]);
    if (unanswered.length > 0) {
      alert(`Please answer all questions. Missing: ${unanswered.map(q => q.label).join(', ')}`);
      return;
    }

    setLoading(true);

    const formattedAnswers = questions.map((q) => ({
      question: q.label,
      answer: answers[q.key]
    }));

    try {
      console.log("🎭 Submitting quiz for user:", user.id);
      const response = await createQuiz({ 
        user_id: user.id,  // FIXED: Use actual user ID instead of hardcoded 1
        answers: formattedAnswers 
      });
      console.log("✅ Quiz created:", response.quiz_id);
      navigate(`/result/${response.quiz_id}`);
    } catch (err) {
      console.error("❌ Quiz submission failed:", err);
      alert(err.response?.data?.error || "Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper> 
      <div className="quiz-form-container max-w-2xl mx-auto py-6 px-4 bg-white rounded-xl shadow-xl border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          MoodieMatch Quiz
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Hey {user.username}! Let's find your perfect movie match.
        </p>
        
        <form onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div key={q.key} className="mb-6">
              <label className="block mb-3 font-semibold text-lg text-purple-800">
                {q.label}
              </label>
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
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-4 rounded-full shadow-md hover:shadow-lg transition text-lg font-semibold disabled:opacity-50"
          >
            {loading ? "🎬 Finding Your Perfect Match..." : "🎬 Reveal My Moodie Match"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default QuizForm;