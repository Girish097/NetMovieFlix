import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-netflix-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-netflix-red cursor-pointer"
              onClick={() => navigate('/')}
            >
              MovieFlix
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-300 text-sm hidden sm:block">
                Welcome, {user.name}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
