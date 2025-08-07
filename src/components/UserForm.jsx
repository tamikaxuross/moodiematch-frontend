import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api";


export default function UserForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");

    try {
      console.log("🚀 Creating user:", username.trim());
      const userData = await createUser({ username: username.trim() });
      console.log("✅ User created/found:", userData);
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/quiz");
    } catch (error) {
      console.error("❌ User creation failed:", error);
      setError(error.response?.data?.error || "Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Welcome to MoodieMatch!</h2>
      
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          Enter your name:
        </label>
        <input
          type="text"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          required
          disabled={loading}
        />
        
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-200 font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Start Quiz"}
        </button>
      </form>
    </div>
  );
}