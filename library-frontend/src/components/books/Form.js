import React from 'react';
import { BookOpen, User, Barcode, Building, Calendar, Layers, CheckSquare, Image } from 'lucide-react';

const InputWithIcon = ({ label, icon: Icon, type, value, onChange, ...rest }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
    <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      <span className="pl-3 text-gray-500">
        <Icon size={18} />
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full py-2 px-3 rounded-md focus:outline-none focus:ring-0 bg-transparent"
        {...rest}
      />
    </div>
  </div>
);

const SelectWithIcon = ({ label, icon: Icon, value, onChange, options, ...rest }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
    <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      <span className="pl-3 text-gray-500">
        <Icon size={18} />
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full py-2 px-3 rounded-md focus:outline-none focus:ring-0 bg-transparent"
        {...rest}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const BookForm = ({ book, setBook, onSubmit, buttonLabel = "Save", categories = [] }) => {
  const handleFileChange = (e) => {
    setBook({ ...book, cover_image: e.target.files[0] });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6 bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">📚 Book Details</h2>

      <InputWithIcon
        label="Title"
        icon={BookOpen}
        type="text"
        value={book.title || ''}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        required
      />

      <InputWithIcon
        label="Author"
        icon={User}
        type="text"
        value={book.author || ''}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        required
      />

      <SelectWithIcon
        label="Category"
        icon={Layers}
        value={book.category_id || ''}
        onChange={(e) => setBook({ ...book, category_id: e.target.value })}
        options={categories.map((category) => ({ id: category.id, name: category.name }))}
        required
      />

      <InputWithIcon
        label="ISBN"
        icon={Barcode}
        type="text"
        value={book.isbn || ''}
        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
      />

      <InputWithIcon
        label="Publisher"
        icon={Building}
        type="text"
        value={book.publisher || ''}
        onChange={(e) => setBook({ ...book, publisher: e.target.value })}
      />

      <InputWithIcon
        label="Published Year"
        icon={Calendar}
        type="number"
        value={book.published_year || ''}
        onChange={(e) => setBook({ ...book, published_year: e.target.value })}
      />

      <InputWithIcon
        label="Total Copies"
        icon={Layers}
        type="number"
        value={book.total_copies || ''}
        onChange={(e) => setBook({ ...book, total_copies: e.target.value })}
        required
        min="1"
      />

      <InputWithIcon
        label="Available Copies"
        icon={CheckSquare}
        type="number"
        value={book.available_copies || ''}
        onChange={(e) => setBook({ ...book, available_copies: e.target.value })}
        required
        min="0"
        max={book.total_copies || ''}
      />

      {/* Cover Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">Cover Image</label>
        <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
          <span className="pl-3 text-gray-500">
            <Image size={18} />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full py-2 px-3 rounded-md focus:outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
