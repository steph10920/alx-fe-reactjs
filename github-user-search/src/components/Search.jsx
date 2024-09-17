import React, { useState } from 'react';

function Search({ onSearch }) {
  const [username, setUsername] = useState('');  // State to track input value

  const handleInputChange = (event) => {
    setUsername(event.target.value);  // Update input value when the user types
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent form reload
    if (username.trim()) {
      onSearch(username);  // Pass the username to the parent component when form is submitted
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
