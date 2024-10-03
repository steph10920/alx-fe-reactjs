import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSearch} className="mb-5">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for news..."
        className="p-2 border border-gray-300 rounded-lg w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
