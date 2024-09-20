import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');  // State for input
  const [userData, setUserData] = useState(null);  // State for storing user data
  const [loading, setLoading] = useState(false);  // State for loading indicator
  const [error, setError] = useState('');  // State for error handling

  const handleInputChange = (event) => {
    setUsername(event.target.value);  // Update input value
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent form submission reload
    setLoading(true);  // Set loading to true while making the request
    setError('');  // Clear any previous errors
    setUserData(null);  // Clear previous data
    try {
      const data = await fetchUserData(username);  // Fetch user data from the API
      setUserData(data);  // Set the retrieved data
    } catch (error) {
      setError("Looks like we can't find the user");  // Set the required error message
    } finally {
      setLoading(false);  // Set loading to false after the request
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p>{error}</p>}

      {/* Display user data */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} width={100} />  {/* User avatar */}
          <h2>{userData.name || userData.login}</h2>  {/* Display user name or login */}
          <p>Followers: {userData.followers}</p>  {/* Display followers count */}
          <p>Following: {userData.following}</p>  {/* Display following count */}
          <p>
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              Visit GitHub Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;
