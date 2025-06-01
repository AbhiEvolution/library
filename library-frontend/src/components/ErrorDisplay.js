import { useEffect } from 'react';

const ErrorDisplay = ({ error, onClose }) => {
  // Automatically close error after 5 seconds
  useEffect(() => {
    if (!error) return;
    
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, onClose]);

  if (!error) return null;

  return (
    <div className="rounded-md bg-red-50 p-4 mb-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            {Array.isArray(error) ? (
              error.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
