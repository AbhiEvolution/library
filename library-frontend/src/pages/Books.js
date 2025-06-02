import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BooksIndex from '../components/books/Index';
import BookShow from '../components/books/Show';
import { useAuth } from '../contexts/AuthContext';

const Books = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-6">Please login to view books</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<BooksIndex />} />
              <Route path="/:id" element={<BookShow />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
