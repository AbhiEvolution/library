import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ErrorDisplay from '../components/ErrorDisplay';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signup(formData);
      if (result.success) {
        navigate('/');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-all duration-300">
        {/* Left: Form */}
        <div className="p-10 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-indigo-700">Create Your Account</h2>
            <p className="mt-2 text-gray-600 text-lg">Join our community of book lovers</p>
          </div>

          <ErrorDisplay error={error} onClose={() => setError(null)} />

          <form onSubmit={handleSubmit} className="space-y-4">
            {['name', 'email', 'password', 'password_confirmation'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-semibold text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition duration-200"
                  placeholder={`Enter your ${field.replace('_', ' ')}`}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-md font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Create Account</span>
                </span>
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200">
              Sign in
            </a>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="relative bg-gradient-to-br from-indigo-500 to-blue-500 text-white hidden lg:flex flex-col justify-center items-center p-10">
          <div className="text-center space-y-4 z-10">
            <h3 className="text-3xl font-bold">Welcome to Our Library</h3>
            <p className="text-lg">Discover amazing books and connect with fellow readers.</p>
            <div className="flex space-x-4 justify-center mt-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')" }}></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
