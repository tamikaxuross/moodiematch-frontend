import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "../styles/Home.css";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const randomPage = Math.floor(Math.random() * 10) + 1; // page 1–10 k

  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${randomPage}`)
    .then((res) => res.json())
    .then((data) => {
      const safePopularMovies = data.results
        .filter((movie) =>
          !movie.adult &&                        // no NSFW
          movie.poster_path &&                   // must have poster
          movie.original_language === "en"       // avoid obscure titles
        )
        .slice(0, 8); // limit to 8

      setMovies(safePopularMovies);
    })
    .catch((err) => console.error("TMDb fetch failed:", err));
}, []);




  return (
    <PageWrapper>
      <div className="home-container">
        <h1 className="home-title">Welcome to MoodieMatch 🎬</h1>
        <p className="home-description">
          Not sure what to watch? Take our mood-based quiz and get a movie rec based on your vibe.
        </p>

        <Link to="/quiz" className="home-button">
          🎭 Take the Mood Quiz
        </Link>

        <div className="poster-grid">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="poster-image"
              src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              title={movie.title}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
