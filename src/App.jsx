import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizForm from "./pages/QuizForm";
import QuizResult from "./pages/QuizResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizForm />} />
      <Route path="/result/:quizId" element={<QuizResult />} />
    </Routes>
  );
}

export default App;