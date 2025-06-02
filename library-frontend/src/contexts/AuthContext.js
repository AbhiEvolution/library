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
      if (response.data) {
        setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role
        });
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

  const signup = async (formData) => {
    try {
      const response = await api.post('/signup', {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          roles: formData.roles
        }
      });

      if (response.data && response.data.status && response.data.status.code === 200) {
        const userData = response.data.data;
        const token = userData.jwt;
        if (!token) throw new Error('No token returned');

        localStorage.setItem('jwt', token);
        setAuthToken(token);

        setUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role
        });
        return { success: true };
      } else {
        throw new Error(response.data?.status?.message || 'Invalid user data');
      }
    } catch (error) {
      console.error('Signup error:', error);
      localStorage.removeItem('jwt');
      setAuthToken(null);
      setUser(null);
      return {
        success: false,
        error: error.response?.data?.status?.message || error.message,
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        user: { email, password }
      });

      if (response.data && response.data.status && response.data.status.code === 200) {
        const userData = response.data.data;
        const token = userData.jwt;
        if (!token) throw new Error('No token returned');

        localStorage.setItem('jwt', token);
        setAuthToken(token);

        setUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role
        });
        return { success: true };
      } else {
        throw new Error(response.data?.status?.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('jwt');
      setAuthToken(null);
      setUser(null);
      return {
        success: false,
        error: error.response?.data?.status?.message || error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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
