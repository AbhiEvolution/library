import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    hoverRating: 0
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating,
      hoverRating: rating
    }));
  };

  const handleStarHover = (rating) => {
    setFormData(prev => ({
      ...prev,
      hoverRating: rating
    }));
  };

  const handleStarLeave = () => {
    setFormData(prev => ({
      ...prev,
      hoverRating: 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    try {
      const { data } = await api.post(`/books/${bookId}/reviews`, {
        data: {
          type: 'reviews',
          attributes: {
            rating: formData.rating,
            comment: formData.comment
          }
        }
      });

      if (data?.data) {
        setFormData({ rating: 0, comment: '', hoverRating: 0 });
        setError(null);
        setSuccess(true);
        if (onReviewAdded) {
          onReviewAdded(data.data);
        }
      } else {
        throw new Error('Review submission failed');
      }
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || err.message);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Write a Review</h2>

        {success && (
          <div className="text-green-600 text-lg bg-green-50 rounded-lg p-4 mb-6">
            Review submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Rating (1-5)
            </label>
            <div className="flex items-center justify-center space-x-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className={`p-3 rounded-full transition-all duration-300 transform ${
                    formData.hoverRating >= star || formData.rating >= star
                      ? 'bg-yellow-400 text-yellow-900 shadow-lg'
                      : 'bg-gray-100 text-gray-400 hover:bg-yellow-300 hover:text-yellow-900'
                  }`}
                  type="button"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-3">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="5"
              className="w-full px-6 py-4 border border-gray-200 rounded-xl shadow-sm text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Share your thoughts about this book..."
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-lg bg-red-50 rounded-lg p-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!formData.rating || !formData.comment}
            className={`w-full py-4 px-8 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              !formData.rating || !formData.comment
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
