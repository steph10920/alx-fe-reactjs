import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const searchUser = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleInputChange}
      />
      <button onClick={searchUser}>Search</button>

      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <p>Username: {userData.login}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
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
