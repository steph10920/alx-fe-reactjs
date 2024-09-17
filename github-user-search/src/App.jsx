// src/App.jsx
import React, { useState } from 'react';
import Search from './components/Search';  // Search component
import { fetchUserData } from './services/githubService';  // Service for fetching data

function App() {
  const [userData, setUserData] = useState(null);  // State for storing user data
  const [loading, setLoading] = useState(false);  // State for loading
  const [error, setError] = useState('');  // State for handling error messages

  // Function to fetch GitHub user data
  const searchUser = async (username) => {
    setLoading(true);  // Set loading to true while fetching
    setError('');  // Clear any previous errors
    setUserData(null);  // Clear previous user data
    try {
      const data = await fetchUserData(username);  // Fetch user data
      setUserData(data);  // Store the data in state
    } catch (error) {
      setError('Looks like we can\'t find the user');  // Show error message if the API call fails
    } finally {
      setLoading(false);  // Stop loading once data is fetched or an error occurs
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search onSearch={searchUser} />  {/* Pass the search function to the Search component */}

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p>{error}</p>}

      {/* Display user data if it exists */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} width={100} />  {/* Display user avatar */}
          <h2>{userData.name || userData.login}</h2>  {/* Display user name or login */}
          <p>Followers: {userData.followers}</p>  {/* Display user followers */}
          <p>Following: {userData.following}</p>  {/* Display user following */}
          <p>
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              Visit GitHub Profile  {/* Link to the GitHub profile */}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
