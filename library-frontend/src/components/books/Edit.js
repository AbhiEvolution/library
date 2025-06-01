import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import BookForm from '../../components/books/BookForm';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, book);
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Edit Book</h1>
            <button onClick={() => navigate('/books')} className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          <BookForm book={book} setBook={setBook} onSubmit={handleSubmit} buttonLabel="Update Book" />
        </div>
      </div>
    </div>
  );
};

export default Edit;
