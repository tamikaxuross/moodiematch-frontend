import "../App.css";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  console.log(" Home component is rendering");


  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold mb-2 text-center">Welcome to MoodieMatch</h1>
      <p className="text-gray-700 text-center">Get a movie to match your mood!</p>
    </PageWrapper>
  );
}
