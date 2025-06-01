import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ErrorDisplay from '../components/ErrorDisplay';
import Index from '../components/books/Index';
import Create from '../components/books/Create';
import Show from '../components/books/Show';

const HomePage = () => {
  const [error, setError] = useState(null);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token on mount
    const token = localStorage.getItem('userToken');
    if (token) {
      // You might want to validate the token here
    } else if (!user) {
      // Redirect to login if no token and no user
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('userToken');
      logout();
      navigate('/login');
    } catch (err) {
      setError('Error logging out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Library</h1>
            <div className="flex space-x-4">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              ) : (
                <>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate('/signup')}
                        className="px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {!user ? (
          <div className="relative h-[60vh] bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent"></div>
            <img
              src="/images/library.jpg"
              alt="Library"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Library</h1>
                <p className="text-xl md:text-2xl mb-8">Discover, Learn, and Explore</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-8 py-3 bg-white hover:bg-gray-100 rounded-lg text-indigo-600 font-semibold transition-colors border border-indigo-600"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <ErrorDisplay error={error} onClose={() => setError(null)} />
            
            <section className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Welcome to the Library</h2>
              <p className="text-gray-700">Explore thousands of books and expand your knowledge.</p>
            </section>
            
            <div className="space-y-6">
              <Index />
              <Create />
              <Show />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300"> 2025 Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
