// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import UserCard from './components/UserCard';

function App() {
  const [userData, setUserData] = useState(null);

  const searchUser = async (username) => {
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
      <SearchInput onSearch={searchUser} />
      <UserCard userData={userData} />
    </div>
  );
}

export default App;
