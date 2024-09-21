import React, { useState } from 'react';
import { fetchAdvancedUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setUserData([]);
    try {
      const data = await fetchAdvancedUserData(username, location, minRepos);
      setUserData(data.items); // Search API response will be in 'items'
    } catch (error) {
      setError("Looks like we cant find any users matching the criteria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Enter GitHub username"
            className="border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter location"
            className="border rounded p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min number of repositories"
            className="border rounded p-2"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Display loading, error, and user data */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {userData.length > 0 &&
          userData.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-lg shadow-md flex items-center space-x-4"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">{user.login}</h2>
                <p>Location: {user.location || 'N/A'}</p>
                <p>Repos: {user.public_repos || 'N/A'}</p>
                <a
                  href={user.html_url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Profile
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
