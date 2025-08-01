 import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>MoodieMatch &copy; {new Date().getFullYear()}</p>
        <p className="footer-links">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
            Powered by TMDb
          </a>
        </p>
      </div>
    </footer>
  );
}
