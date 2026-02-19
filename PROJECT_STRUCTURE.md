# MovieFlix - Project Structure

## 📁 Complete Folder Structure

```
NetFlix Project/
├── node_modules/              # Dependencies (auto-generated)
├── public/                    # Static assets
├── src/
│   ├── app/                   # App-level configuration (reserved)
│   ├── pages/                 # Page components
│   │   ├── Login.tsx          # Login page with email/password form
│   │   ├── Signup.tsx         # Signup page with name/email/password
│   │   ├── Home.tsx           # Dashboard with movie grid and search
│   │   └── MovieDetails.tsx   # Detailed movie information page
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.tsx         # Top navigation with logo and logout
│   │   ├── MovieCard.tsx      # Movie card with poster, title, year
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   └── SearchBar.tsx      # Debounced search input component
│   ├── context/               # React Context providers
│   │   └── AuthContext.tsx    # Authentication state management
│   ├── services/              # API and business logic services
│   │   ├── authService.ts     # Mock authentication (localStorage)
│   │   └── movieService.ts    # OMDB API integration
│   ├── hooks/                 # Custom React hooks
│   │   └── useDebounce.ts     # Debounce hook for search input
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Shared types (User, Movie, etc.)
│   ├── utils/                 # Utility functions (placeholder)
│   ├── styles/                # Additional stylesheets (placeholder)
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles with TailwindCSS
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

## 🔑 Key Components Explained

### Pages

1. **Login.tsx**
   - Email and password authentication
   - Form validation
   - Error handling
   - Link to signup page
   - Redirects to home on success

2. **Signup.tsx**
   - Name, email, password, confirm password
   - Password validation (min 6 chars)
   - Password match validation
   - Auto-login after signup
   - Link to login page

3. **Home.tsx**
   - Protected route (requires authentication)
   - Navbar with logout
   - Hero section with welcome message
   - Search bar with debouncing
   - Responsive movie grid (2-6 columns)
   - Default search: "batman"
   - Loading and error states

4. **MovieDetails.tsx**
   - Protected route
   - Fetches movie by IMDB ID
   - Displays comprehensive movie information:
     - Poster image
     - Title, year, rating
     - Genre tags
     - Plot summary
     - Director, writer, cast
     - Ratings from multiple sources
     - Awards, box office, etc.
   - Back navigation
   - Responsive layout

### Components

1. **Navbar.tsx**
   - Sticky navigation bar
   - MovieFlix logo (clickable, navigates home)
   - User welcome message
   - Logout button

2. **MovieCard.tsx**
   - Movie poster image
   - Title and year
   - Hover animations
   - Clickable → navigates to details
   - Fallback for missing posters

3. **SearchBar.tsx**
   - Debounced input (500ms)
   - Loading indicator
   - Search icon
   - Calls parent's onSearch callback

4. **ProtectedRoute.tsx**
   - Wraps protected routes
   - Checks authentication status
   - Shows loading spinner while checking
   - Redirects to login if not authenticated

### Context

**AuthContext.tsx**
- Provides authentication state globally
- Manages user session
- Exposes:
  - `user`: Current user object
  - `isAuthenticated`: Boolean status
  - `login(data)`: Login function
  - `signup(data)`: Signup function
  - `logout()`: Logout function
  - `loading`: Loading state

### Services

1. **authService.ts**
   - Mock authentication (frontend-only)
   - Stores users in localStorage
   - Password validation
   - Session management
   - Functions:
     - `signup(data)`: Create new user
     - `login(data)`: Authenticate user
     - `logout()`: Clear session
     - `getSession()`: Get current session

2. **movieService.ts**
   - OMDB API integration
   - Axios instance configuration
   - Error handling
   - Functions:
     - `searchMovies(query)`: Search by title
     - `getMovieDetails(imdbID)`: Get full details

### Hooks

**useDebounce.ts**
- Generic debounce hook
- Delays value updates
- Used for search input (500ms delay)
- Prevents excessive API calls

### Types

**types/index.ts**
- `User`: User interface
- `SignupData`: Signup form data
- `LoginData`: Login form data
- `Movie`: Basic movie info
- `MovieDetails`: Full movie information
- `Rating`: Movie rating object
- `MovieSearchResponse`: API response type

## 🎨 Styling Approach

- **TailwindCSS v4**: Utility-first CSS framework
- **Custom Colors**: Defined in `src/index.css` using `@theme`
  - `netflix-red`: #E50914
  - `netflix-black`: #141414
  - `netflix-dark`: #181818
- **Dark Theme**: Netflix-inspired design
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects

## 🔄 Data Flow

1. **Authentication Flow**:
   - User signs up → stored in localStorage → auto-login
   - User logs in → validated → session stored → redirect to home
   - User logs out → session cleared → redirect to login

2. **Movie Search Flow**:
   - User types in search → debounced (500ms) → API call → results displayed
   - Default search on page load: "batman"

3. **Movie Details Flow**:
   - User clicks movie card → navigate to `/movie/:id` → fetch details → display

## 🛡️ Protected Routes

Routes protected by `ProtectedRoute`:
- `/` (Home)
- `/movie/:id` (Movie Details)

Public routes:
- `/login`
- `/signup`

## 📡 API Integration

**OMDB API**:
- Base URL: `https://www.omdbapi.com/`
- API Key: `92adea90`
- Endpoints:
  - Search: `?s={query}&apikey={key}`
  - Details: `?i={imdbID}&apikey={key}`

## 🚀 Running the Application

1. **Development**:
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

2. **Production Build**:
   ```bash
   npm run build
   ```
   Output in `dist/` folder

3. **Preview Production**:
   ```bash
   npm run preview
   ```

## ✅ Features Implemented

- ✅ User signup and login
- ✅ Protected routes
- ✅ Movie search with debouncing
- ✅ Movie details page
- ✅ Netflix-style dark UI
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Session persistence
- ✅ Clean architecture
- ✅ TypeScript types
- ✅ Reusable components
