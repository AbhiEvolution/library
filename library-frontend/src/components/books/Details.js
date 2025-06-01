import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book');
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBack = () => navigate('/books');

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Book Details</h1>
          <p className="text-gray-500 text-lg">
            Discover detailed information and availability of the selected book
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-indigo-600 hover:underline hover:text-indigo-800 transition"
        >
          ← Back to Book List
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            {/* Left - Gradient Icon Block */}
            <div className="flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 w-full md:w-1/3 p-10 text-white">
              <div className="text-center">
                <div className="mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p className="text-sm mt-2">By {book.author}</p>
              </div>
            </div>

            {/* Right - Info Block */}
            <div className="w-full md:w-2/3 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">📘 Book Info</h3>
                  <ul className="text-sm space-y-2">
                    <li><strong>ISBN:</strong> {book.isbn}</li>
                    <li><strong>Publisher:</strong> {book.publisher}</li>
                    <li><strong>Published:</strong> {book.published_year}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">📦 Stock Details</h3>
                  <ul className="text-sm space-y-2">
                    <li><strong>Total Copies:</strong> {book.total_copies}</li>
                    <li><strong>Available:</strong> {book.available_copies}</li>
                  </ul>
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      book.available_copies > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {book.available_copies > 0 ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description (Optional) */}
              {book.description && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {book.description}
                  </p>
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
