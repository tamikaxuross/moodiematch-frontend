import { useState, useEffect } from "react";
import axios from "axios";

export default function Ping() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/ping")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  return <h2>{message}</h2>;
}
