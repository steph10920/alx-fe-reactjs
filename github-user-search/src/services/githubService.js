import axios from 'axios';

// Construct the query for advanced search
export const fetchAdvancedUserData = async (username, location, minRepos) => {
  let query = '';

  // Include username in search
  if (username) {
    query += `${username} in:login `;
  }

  // Include location in search
  if (location) {
    query += `location:${location} `;
  }

  // Include minimum repository count in search
  if (minRepos) {
    query += `repos:>=${minRepos} `;
  }

  // GitHub Search API endpoint
  const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
  
  return response.data;
};
