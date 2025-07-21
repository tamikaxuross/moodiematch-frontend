import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Ping from "./components/Ping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ping" element={<Ping />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
