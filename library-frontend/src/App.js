import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Books from './pages/Books';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookDetails from './components/books/Details';
import Create from './components/books/Create';
import Edit from './components/books/Edit'; // Added import statement for Edit component
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/books" replace />} />
              <Route
                path="/books"
                element={
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books/:id"
                element={
                  <ProtectedRoute>
                    <BookDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books/:id/edit"
                element={
                  <ProtectedRoute>
                    <Edit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books/new"
                element={
                  <ProtectedRoute>
                    <Create />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
