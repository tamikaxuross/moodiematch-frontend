import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import QuizForm from "./pages/QuizForm";
import QuizResult from "./pages/QuizResult";
import Start from "./pages/Start";
import Footer from "./components/Footer";
import Watchlist from "./pages/Watchlist";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("👤 Restored user:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("user"); // Clean up bad data
        
      }
    }
  }, []);

  return (
  <>
    <NavBar user={user} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start setUser={setUser} />} />
      <Route path="/quiz" element={<QuizForm user={user} />} />
      <Route path="/result/:quizId" element={<QuizResult />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
    <Footer />
  </>
  );
}

export default App;