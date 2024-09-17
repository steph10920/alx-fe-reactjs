import React, { useState } from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

function App() {
  const [userData, setUserData] = useState(null);  // State for GitHub user data
  const [loading, setLoading] = useState(false);  // State to handle loading message
  const [error, setError] = useState('');  // State to handle error messages

  // Function to fetch GitHub user data
  const searchUser = async (username) => {
    setLoading(true);  // Set loading to true while fetching data
    setError('');  // Clear any previous errors
    setUserData(null);  // Clear previous user data
    try {
      const data = await fetchUserData(username);  // Fetch data from GitHub API
      setUserData(data);  // Store the fetched data
    } catch (error) {
      setError('Looks like we can\'t find the user');  // Show error message if the user is not found
    } finally {
      setLoading(false);  // Stop loading after the data is fetched or an error occurs
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search onSearch={searchUser} />  {/* Pass the search function to Search component */}

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p>{error}</p>}

      {/* User Data */}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.login} width={100} />  {/* Display user avatar */}
          <h2>{userData.name || userData.login}</h2>  {/* Display name or login */}
          <p>Followers: {userData.followers}</p>  {/* Display followers */}
          <p>Following: {userData.following}</p>  {/* Display following */}
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

export default App;
