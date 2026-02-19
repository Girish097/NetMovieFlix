# MovieFlix 🎬

A modern Netflix-style web application built with React, TypeScript, and TailwindCSS. Browse and discover movies using the OMDB API.

## 🚀 Features

- **User Authentication**: Sign up and login with mock authentication (frontend-only)
- **Protected Routes**: Secure access to movie browsing features
- **Movie Search**: Search for movies using the OMDB API with debounced input
- **Movie Details**: View comprehensive movie information including ratings, cast, plot, and more
- **Netflix-Style UI**: Dark theme with modern, responsive design
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication
- **LocalStorage** - Session persistence

## 📁 Project Structure

```
src/
├── app/                    # App-level configuration
├── pages/                  # Page components
│   ├── Login.tsx          # Login page
│   ├── Signup.tsx         # Signup page
│   ├── Home.tsx           # Home/Dashboard page
│   └── MovieDetails.tsx   # Movie details page
├── components/             # Reusable components
│   ├── Navbar.tsx         # Navigation bar
│   ├── MovieCard.tsx      # Movie card component
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── SearchBar.tsx      # Search input component
├── context/               # React Context providers
│   └── AuthContext.tsx    # Authentication context
├── services/              # API services
│   ├── authService.ts     # Authentication service
│   └── movieService.ts    # Movie API service
├── hooks/                 # Custom React hooks
│   └── useDebounce.ts     # Debounce hook for search
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared types
├── utils/                 # Utility functions
├── styles/                # Global styles
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication

The app uses **mock authentication** (frontend-only). User data is stored in localStorage.

### Sign Up
- Name
- Email
- Password (minimum 6 characters)
- Confirm Password

### Login
- Email
- Password

**Note**: After signup, users are automatically logged in.

## 🎬 API Integration

The app uses the [OMDB API](https://www.omdbapi.com/) to fetch movie data.

- **API Key**: `92adea90` (configured in `src/services/movieService.ts`)
- **Base URL**: `https://www.omdbapi.com/`

### API Endpoints Used

- **Search Movies**: `?s={query}&apikey={key}`
- **Get Movie Details**: `?i={imdbID}&apikey={key}`

## 🎨 Key Components

### ProtectedRoute
Wraps protected routes and redirects unauthenticated users to the login page.

### AuthContext
Manages authentication state across the application:
- `user`: Current user object
- `isAuthenticated`: Boolean authentication status
- `login()`: Login function
- `signup()`: Signup function
- `logout()`: Logout function

### MovieCard
Displays movie poster, title, and year. Clickable to navigate to movie details.

### SearchBar
Debounced search input that triggers movie search after 500ms of inactivity.

## 🎯 Features Explained

### Movie Search
- Default search: "batman" on initial load
- Debounced input (500ms delay)
- Real-time search results
- Error handling for API failures

### Movie Details
Displays comprehensive movie information:
- Poster image
- Title, Year, Rating
- Genre tags
- Plot summary
- Director, Writer, Cast
- Ratings from multiple sources
- Awards, Box Office, and more

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size:
  - Mobile: 2 columns
  - Tablet: 3-4 columns
  - Desktop: 5-6 columns

## 🐛 Error Handling

The app handles various error scenarios:
- Invalid login credentials
- API errors
- Empty search results
- Network failures
- Missing movie data

## 🎨 Styling

- **Dark Theme**: Netflix-inspired black and red color scheme
- **Custom Colors**: Defined in `tailwind.config.js`
  - `netflix-red`: #E50914
  - `netflix-black`: #141414
  - `netflix-dark`: #181818

## 📝 Environment Setup

No environment variables are required. The API key is configured directly in the service file.

If you need to use a different API key:
1. Edit `src/services/movieService.ts`
2. Update the `API_KEY` constant

## 🧪 Code Quality

- TypeScript for type safety
- Functional components with hooks
- Clean separation of concerns
- Reusable components
- Meaningful naming conventions
- Error boundaries and loading states

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for movie data
- Netflix for design inspiration

---

**Happy Movie Browsing! 🍿**
