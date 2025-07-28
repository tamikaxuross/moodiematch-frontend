import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import QuizForm from "./pages/QuizForm";
import QuizResult from "./pages/QuizResult";
import Start from "./pages/Start";


function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser);
  }, []);

  return (
  <>
    <NavBar user={user} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start setUser={setUser} />} />
      <Route path="/quiz" element={<QuizForm user={user} />} />
      <Route path="/result/:quizId" element={<QuizResults />} />
    </Routes>
  </>
  );
}

export default App;