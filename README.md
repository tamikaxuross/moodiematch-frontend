# 🎬 MoodieMatch Frontend

A React-based web application that recommends movies based on your current mood! Take a fun quiz and discover your perfect movie match.

## 🌟 Features

- **Mood-Based Quiz**: Answer fun questions about your current vibe
- **Movie Recommendations**: Get personalized movie suggestions
- **Watchlist**: Save movies you want to watch later
- **Movie Diary**: Keep track of movies you've watched with ratings and notes
- **Beautiful UI**: Clean, modern interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-frontend-repo-url>
   cd moodiematch-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000/api
   VITE_TMDB_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
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
```

## 🎯 How It Works

1. **Start**: Create an account with your name
2. **Quiz**: Answer 6 fun questions about your mood
3. **Results**: Get personalized movie recommendations
4. **Save**: Add movies to your watchlist
5. **Track**: Log watched movies in your diary

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BACKEND_URL` | Backend API URL | Yes |
| `VITE_TMDB_KEY` | TMDb API key for movie data | Yes |

### Getting TMDb API Key

1. Visit [TMDb](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key
5. Copy your API key to the `.env` file

## 🚨 Common Issues

### "Network Error" or API not working
- Make sure the backend server is running
- Check that `VITE_BACKEND_URL` points to the correct backend URL

### Movies not loading
- Verify your TMDb API key is correct
- Check browser console for error messages

### Styling issues
- Clear browser cache
- Make sure all CSS files are properly imported

## 📱 Responsive Design

The app is fully responsive and works on:
- 💻 Desktop computers
- 📱 Mobile phones
- 🖥️ Tablets

## 🎨 Technologies Used

- **React 19** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP requests
- **Vite** - Build tool
- **CSS3** - Styling with custom properties

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💡 Tips for Beginners

- **First time with React?** Check out the [React documentation](https://react.dev/)
- **New to JavaScript?** Try [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Want to customize?** Start by modifying the CSS files in the `styles/` folder
- **Need help?** Open an issue in the repository

## 🎉 Enjoy discovering your perfect movie match!

Created by @ Tamika Ross
