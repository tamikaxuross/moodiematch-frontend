import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserForm({ setUser }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(username);
    localStorage.setItem("username", username);
    navigate("/quiz");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <label className="block mb-2 text-lg font-bold">Enter your name:</label>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded w-full mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Start Quiz
      </button>
    </form>
  );
}
