import { useEffect, useState } from "react";
import "../styles/MovieDiary.css";
import PageWrapper from "../components/PageWrapper";

const MovieDiary = ({ user: propUser }) => {
  const [user, setUser] = useState(propUser);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    movie_title: '',
    notes: '',
    rating: 5
  });

  const apiBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

  // Get user from localStorage if not passed as prop
  useEffect(() => {
    if (!propUser) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  // Fetch diary entries when user is available
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    fetch(`${apiBase}/diary/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDiaryEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load diary entries", err);
        setLoading(false);
      });
  }, [user?.id, apiBase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const res = await fetch(`${apiBase}/diary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          ...formData
        }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setDiaryEntries([newEntry, ...diaryEntries]);
        setFormData({ movie_title: '', notes: '', rating: 5 });
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error adding diary entry", err);
    }
  };

  const deleteEntry = async (id) => {
    if (!user?.id) return;

    try {
      const res = await fetch(`${apiBase}/diary/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      if (res.ok) {
        setDiaryEntries(diaryEntries.filter(entry => entry.id !== id));
      }
    } catch (err) {
      console.error("Error deleting diary entry", err);
    }
  };

  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Please log in first</h2>
          <p className="text-gray-600 mb-4">You need to log in to access your movie diary.</p>
          <button 
            onClick={() => window.location.href = "/start"}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
          >
            Go to Login
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (loading) {
    return (
      <PageWrapper>
        <p className="text-center mt-10">Loading your movie diary...</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="diary-page">
        <div className="diary-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">📖 My Movie Diary</h1>
          <p className="text-gray-600">Keep track of movies you've watched, {user.username}!</p>
        </div>

        {/* Add Entry Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
          >
            {showForm ? "Cancel" : "📝 Add Movie Entry"}
          </button>
        </div>

        {/* Add Entry Form */}
        {showForm && (
          <div className="bg-purple-50 p-6 rounded-lg mb-8 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-700 mb-4">Add New Movie</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-purple-700 font-semibold mb-2">Movie Title *</label>
                <input
                  type="text"
                  value={formData.movie_title}
                  onChange={(e) => setFormData({...formData, movie_title: e.target.value})}
                  className="w-full p-3 border border-purple-300 rounded-lg"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-purple-700 font-semibold mb-2">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full p-3 border border-purple-300 rounded-lg"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                  <option value={3}>⭐⭐⭐ (3 stars)</option>
                  <option value={2}>⭐⭐ (2 stars)</option>
                  <option value={1}>⭐ (1 star)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-purple-700 font-semibold mb-2">Your Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full p-3 border border-purple-300 rounded-lg h-24"
                  placeholder="What did you think of this movie?"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Save Entry
              </button>
            </form>
          </div>
        )}

        {/* Diary Entries */}
        {diaryEntries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-lg text-gray-600">Your movie diary is empty.</p>
            <p className="text-gray-500">Add your first movie entry above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {diaryEntries.map((entry) => (
              <div key={entry.id} className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-purple-700">{entry.movie_title}</h3>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-3">
                  <span className="text-yellow-500">
                    {"⭐".repeat(entry.rating)}
                  </span>
                  <span className="text-gray-500 ml-2">({entry.rating}/5)</span>
                </div>

                {entry.notes && (
                  <p className="text-gray-700 mb-3">{entry.notes}</p>
                )}

                <p className="text-sm text-gray-500">
                  Added on {new Date(entry.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </PageWrapper>
  );
};

export default MovieDiary;