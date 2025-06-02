import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data } = await api.patch(`/users/${user.id}`, {
        user: {
          username: formData.username,
          email: formData.email,
        }
      });

      if (data?.status?.code === 200) {
        setSuccess('Profile updated successfully!');
        setEditMode(false);
      } else {
        throw new Error(data?.status?.message || 'Update failed');
      }
    } catch (error) {
      setError(error.response?.data?.status?.message || error.message);
    }
  };

  if (!user) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition duration-200 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition duration-200 disabled:bg-gray-100"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="bg-gray-50 px-4 py-3 rounded-md">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {editMode ? (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-end">
              <Link
                to="/login"
                onClick={logout}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;