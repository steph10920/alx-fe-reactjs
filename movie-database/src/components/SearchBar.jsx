import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center mb-4">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 w-2/3 sm:w-1/2 rounded-l-lg border border-gray-300"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
