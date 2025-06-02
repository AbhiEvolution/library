import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    roles: ['member'] // Default to member
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => {
        const newRoles = [...prev.roles];
        if (checked) {
          newRoles.push(value);
        } else {
          const index = newRoles.indexOf(value);
          if (index > -1) {
            newRoles.splice(index, 1);
          }
        }
        return { ...prev, roles: newRoles };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signup(formData);
      if (result.success) {
        navigate('/login');
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {['username', 'email', 'password', 'password_confirmation'].map(field => (
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

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Roles
              </label>
              <div className="space-y-3">
                {[
                  { value: 'member', label: 'Member', description: 'For borrowing books and managing your reading list' },
                  { value: 'librarian', label: 'Librarian', description: 'For managing library operations and book catalog' }
                ].map(({ value, label, description }) => (
                  <div key={value} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={value}
                        name="roles"
                        type="checkbox"
                        value={value}
                        checked={formData.roles.includes(value)}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={value} className="font-medium text-gray-700">
                        {label}
                      </label>
                      <p className="text-gray-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Select one or both roles based on your needs
              </p>
            </div>

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

        {/* Right: Image */}
        <div className="lg:block hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 opacity-50 rounded-r-3xl" />
          <div className="relative p-16">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Library</h2>
            <p className="text-lg text-white/90">
              Join our community of book lovers and discover amazing books
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
