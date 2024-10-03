import React from 'react';

// Create Context
const UserContext = React.createContext();

// Export Context and Provider component
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
