import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext'; // Import UserContext

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // Wrap ProfilePage with UserContext.Provider and pass userData as value
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
