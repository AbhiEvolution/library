import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingState from '../ui/LoadingState';
import ErrorState from '../ui/ErrorState';
import api from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBack = () => {
    navigate('/books');
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">📖 Book Details</h1>
          <p className="text-gray-600 text-sm mt-1">View and manage book information below</p>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          type="button"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Book List
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-3xl">
          <div className="flex flex-col md:flex-row">
            {/* Left */}
            <div className="flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 w-full md:w-1/3 p-10 text-white">
              <div className="text-center">
                {book.cover_image_url ? (
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="mx-auto mb-6 rounded-xl shadow-lg max-h-64 object-contain border border-white"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-book-cover.png';
                    }}
                  />
                ) : (
                  <div className="mb-4 text-white opacity-80">
                    <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm mt-2">No Image</p>
                  </div>
                )}
                <h2 className="text-2xl font-bold">{book.title}</h2>
                <p className="text-sm mt-2">By <span className="italic font-medium">{book.author}</span></p>
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-2/3 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Book Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    📘 Book Info
                  </h3>
                  <ul className="text-sm space-y-2 text-gray-800">
                    <li><strong>ISBN:</strong> {book.isbn}</li>
                    <li><strong>Publisher:</strong> {book.publisher}</li>
                    <li><strong>Published:</strong> {book.published_year}</li>
                  </ul>
                </div>

                {/* Stock Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    📦 Stock Details
                  </h3>
                  <ul className="text-sm space-y-2 text-gray-800">
                    <li><strong>Total Copies:</strong> {book.total_copies}</li>
                    <li><strong>Available:</strong> {book.available_copies}</li>
                  </ul>
                  <div className="mt-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        book.available_copies > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {book.available_copies > 0 ? '✅ Available' : '❌ Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {(user?.role === 'librarian' || user?.role === 'admin') && (
                <div className="mt-10 text-right">
                  <button
                    onClick={() => navigate(`/books/${id}/edit`)}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    ✏️ Edit Book
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
