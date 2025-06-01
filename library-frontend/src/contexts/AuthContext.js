import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set auth header
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setAuthToken(token);

    try {
      const response = await api.get('/current_user');
      if (response.data && response.data.role) {
        setUser(response.data);
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('jwt');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        user: { email, password }
      });

      const token = response.data.jwt;
      if (!token) throw new Error('No token returned');

      localStorage.setItem('jwt', token);
      setAuthToken(token);

      const userData = await api.get('/current_user');
      if (userData.data && userData.data.role) {
        setUser(userData.data);
        return { success: true };
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('jwt');
      setAuthToken(null);
      setUser(null);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
