import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/90 backdrop-blur border-b border-indigo-100 sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13..." />
            </svg>
            <span className="text-2xl font-bold text-indigo-700">📚 Library</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-6 text-sm font-semibold text-gray-700">
            <a href="/" className="hover:text-indigo-600 transition duration-200">Home</a>
            <a href="/books" className="hover:text-indigo-600 transition duration-200">Books</a>
          </div>

          {/* User Section */}
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-white font-bold">
                    {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-indigo-700 font-medium">{user.name || user.email}</span>
                  <svg className="h-4 w-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10 animate-fadeIn">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Settings</a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/login" className="text-sm text-gray-700 hover:text-indigo-600 transition">Sign in</a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:from-indigo-700 hover:to-blue-700"
                >
                  Sign up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:bg-indigo-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 animate-slideDown">
          <a href="/" className="block text-gray-700 text-base font-medium hover:text-indigo-600">Home</a>
          <a href="/books" className="block text-gray-700 text-base font-medium hover:text-indigo-600">Books</a>
          {user ? (
            <button onClick={handleLogout} className="block w-full text-left text-gray-700 hover:text-red-600">Sign out</button>
          ) : (
            <>
              <a href="/login" className="block text-gray-700 hover:text-indigo-600">Sign in</a>
              <a href="/signup" className="block text-indigo-600 font-semibold hover:underline">Sign up</a>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
