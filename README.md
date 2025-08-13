MoodieMatch Frontend
A React-based web application that recommends movies based on your current mood! Take a fun quiz and discover your perfect movie match.

 Features

Mood-Based Quiz: Answer fun questions about your current vibe
Movie Recommendations: Get personalized movie suggestions
Watchlist: Save movies you want to watch later
Movie Diary: Keep track of movies you've watched with ratings and notes
Beautiful UI: Clean, modern interface with smooth animations

Quick Start
Prerequisites

Node.js (version 18 or higher)
npm (comes with Node.js)

Installation

Clone the repository
git clone <your-frontend-repo-url>
cd moodiematch-frontend

Install dependencies
npm install

Set up environment variables
Create a .env file in the root directory:
envVITE_BACKEND_URL=http://localhost:3000/api
VITE_TMDB_KEY=your_tmdb_api_key_here

Start the development server
npm run dev

Open your browser
Navigate to http://localhost:5173

🛠️ Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint for code quality

📁 Project Structure
src/
├── components/          # Reusable UI components
│   ├── FavoriteButton.jsx
│   ├── Footer.jsx
│   ├── NavBar.jsx
│   ├── PageWrapper.jsx
│   └── UserForm.jsx
├── pages/              # Main application pages
│   ├── Home.jsx
│   ├── QuizForm.jsx
│   ├── QuizResult.jsx
│   ├── Start.jsx
│   ├── Watchlist.jsx
│   └── MovieDiary.jsx
├── services/           # API communication
│   └── api.js
├── styles/            # CSS stylesheets
│   ├── Footer.css
│   ├── Home.css
│   ├── NavBar.css
│   └── ...
├── App.jsx            # Main application component
├── App.css            # Global styles
└── main.jsx           # Application entry point
🎯 How It Works

Start: Create an account with your name
Quiz: Answer 6 fun questions about your mood
Results: Get personalized movie recommendations
Save: Add movies to your watchlist
Track: Log watched movies in your diary

🔧 Configuration
Environment Variables
VariableDescriptionRequiredVITE_BACKEND_URLBackend API URLYesVITE_TMDB_KEYTMDb API key for movie dataYes
Getting TMDb API Key

Visit TMDb
Create a free account
Go to Settings → API
Request an API key
Copy your API key to the .env file

Common Issues
"Network Error" or API not working

Make sure the backend server is running
Check that VITE_BACKEND_URL points to the correct backend URL

Movies not loading

Verify your TMDb API key is correct
Check browser console for error messages

Styling issues

Clear browser cache
Make sure all CSS files are properly imported

 Responsive Design
The app is fully responsive and works on:

💻 Desktop computers
📱 Mobile phones
🖥️ Tablets

 Technologies Used

React 19 - UI framework
React Router - Navigation
Axios - HTTP requests
Vite - Build tool
CSS3 - Styling with custom properties

Created by @ Tamika Ross
