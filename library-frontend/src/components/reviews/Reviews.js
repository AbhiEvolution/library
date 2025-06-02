import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Reader Reviews</h2>
      {reviews.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4">No reviews yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-yellow-800 font-medium ml-2">
                      {review.rating} stars
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    by {review.user?.username || 'Anonymous'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="prose prose-sm text-gray-700 max-w-none">
                {review.comment}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
