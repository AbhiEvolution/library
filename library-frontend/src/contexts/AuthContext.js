import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const { data } = await api.get('/current_user');
      if (data) {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        });
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('jwt');
      setAuthToken(undefined);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    try {
      const { data } = await api.post('/signup', {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          role: formData.role,
        }
      });
  
      if (data?.status?.code === 200) {
        return { success: true };
      } else {
        throw new Error(data?.status?.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error.response?.data?.status?.message || error.message,
      };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/login', {
        user: { email, password },
      });

      if (data?.status?.code === 200) {
        const userData = data.data;
        const token = userData.jwt;
        if (!token) throw new Error('No token returned');

        localStorage.setItem('jwt', token);
        setAuthToken(token);

        setUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role,
        });

        return { success: true };
      } else {
        throw new Error(data?.status?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('jwt');
      setAuthToken(undefined);
      setUser(null);
      return {
        success: false,
        error: error.response?.data?.status?.message || error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setAuthToken(undefined);
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
