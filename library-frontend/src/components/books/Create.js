// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/api';

// const BookCreate = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     isbn: '',
//     publisher: '',
//     published_year: '',
//     total_copies: '',
//     available_copies: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await api.post('/books', { book: formData });
//       setFormData({
//         title: '',
//         author: '',
//         isbn: '',
//         publisher: '',
//         published_year: '',
//         total_copies: '',
//         available_copies: ''
//       });
//       navigate('/books', { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create book');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6 flex items-center justify-center">
//       <div className="bg-white w-full max-w-3xl p-10 rounded-3xl shadow-2xl border border-gray-100">
//         <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">📘 Add a New Book</h1>
//         <p className="text-center text-gray-500 mb-10">Please fill out all the fields below</p>

//         {error && (
//           <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded mb-6 shadow-sm">
//             <strong>Error:</strong> {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField label="Title" name="title" value={formData.title} onChange={handleChange} required />
//             <InputField label="Author" name="author" value={formData.author} onChange={handleChange} required />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField label="ISBN" name="isbn" value={formData.isbn} onChange={handleChange} />
//             <InputField label="Publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField
//               label="Published Year"
//               name="published_year"
//               type="number"
//               min="1900"
//               max={new Date().getFullYear()}
//               value={formData.published_year}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Total Copies"
//               name="total_copies"
//               type="number"
//               min="1"
//               required
//               value={formData.total_copies}
//               onChange={handleChange}
//             />
//           </div>

//           <InputField
//             label="Available Copies"
//             name="available_copies"
//             type="number"
//             min="0"
//             max={formData.total_copies || 100}
//             required
//             value={formData.available_copies}
//             onChange={handleChange}
//           />

//           <div className="text-center pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
//             >
//               {loading ? 'Creating Book...' : 'Create Book'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // 🔧 Reusable InputField component
// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = 'text',
//   required = false,
//   min,
//   max
// }) => (
//   <div className="relative">
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       id={name}
//       value={value}
//       onChange={onChange}
//       required={required}
//       min={min}
//       max={max}
//       className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"
//       placeholder={`Enter ${label.toLowerCase()}`}
//       autoComplete="off"
//     />
//   </div>
// );

// export default BookCreate;



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
        const response = await api.get(`/books`);
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
      await api.post(`/books`, book);
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
            <h1 className="text-3xl font-bold">Create Book</h1>
            <button onClick={() => navigate('/books')} className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          <BookForm book={book} setBook={setBook} onSubmit={handleSubmit} buttonLabel="Create Book" />
        </div>
      </div>
    </div>
  );
};

export default Edit;
