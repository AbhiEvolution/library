import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { useAuth } from '../../contexts/AuthContext';
import Pagination from '../../components/ui/Pagination';

const BooksIndex = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (page = 1) => {
    try {
      const response = await api.get(`/books?page=${page}`);
      console.log('API Response:', response.data);
      
      // Extract books from the attributes
      const formattedBooks = response.data.data.map(book => book.attributes);
      setBooks(formattedBooks);
      
      setTotalPages(response.data.meta.total_pages);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchBooks(newPage);
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleDelete = async (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/books/${bookToDelete}`);
      setBooks(books.filter(book => book.id !== bookToDelete));
      setShowDeleteConfirm(false);
      setBookToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete book');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setBookToDelete(null);
  };

  const handleUpdate = (book) => {
    navigate(`/books/${book.id}/edit`);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  if (books.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
        <div className="text-center p-10 bg-white rounded-3xl shadow-2xl hover:shadow-blue-300 transform transition-all duration-500 hover:scale-105">
          <div className="space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse opacity-40 blur-md"></div>
              <div className="relative text-white">
                <svg className="h-20 w-20 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">No Books Found</h3>
            <p className="text-gray-500">Your library is empty. Let's start adding your favorite books!</p>
            <button
              onClick={() => navigate('/books/new')}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="-ml-1 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Book
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this book? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelDelete} className="px-4 py-2 text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Your Books</h1>
          <button
            onClick={() => navigate('/books/new')}
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition duration-300"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Book
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="relative group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/10 rounded-2xl group-hover:opacity-100 transition duration-300 pointer-events-none"></div>

              {/* Cover Image */}
              <div className="mb-4">
                <img
                  src={book.cover_image_url || 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MSwicHVyIjoiYmxvYl9pZCJ9fQ==--0a6b8da1c7e000d5b30cf435e4da8f56c9a2bee9/image002.png'}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-lg shadow"
                />
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="text-indigo-600">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
              </div>

              <p className="text-gray-600 line-clamp-3 text-sm">{book.description}</p>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/books/${book.id}`)}
                  className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-md hover:bg-blue-200 transition transform hover:scale-105"
                >
                  View
                </button>

                {(user?.role === 'librarian' || user?.role === 'admin') && (
                  <>
                    <button
                      onClick={() => handleUpdate(book)}
                      className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md hover:bg-green-200 transition transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-md hover:bg-red-200 transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BooksIndex;