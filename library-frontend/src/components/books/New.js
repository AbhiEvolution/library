// src/components/books/New.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import BookForm from './Form';

const New = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/new`);
        console.log(response.data);
        setBook(response.data.book);
        setCategories(response.data.categories);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate category selection
    if (!book.category_id) {
      setError('Please select a category');
      return;
    }

    const formData = new FormData();
    formData.append("book[title]", book.title || '');
    formData.append("book[author]", book.author || '');
    formData.append("book[isbn]", book.isbn || '');
    formData.append("book[publisher]", book.publisher || '');
    formData.append("book[published_year]", book.published_year || '');
    formData.append("book[total_copies]", book.total_copies || '');
    formData.append("book[available_copies]", book.available_copies || '');
    formData.append("book[category_id]", book.category_id);

    if (book.cover_image) {
      formData.append("book[cover_image]", book.cover_image);
    }

    try {
      await api.post(`/books`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create book');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <BookForm
            book={book}
            setBook={setBook}
            categories={categories}
            onSubmit={handleSubmit}
            buttonLabel="Create Book"
          />
        </div>
      </div>
    </div>
  );
};

export default New;