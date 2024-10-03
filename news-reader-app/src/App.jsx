import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Fetch articles from NewsAPI
  const fetchNews = async (query = '') => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
          country: 'us', // You can change the country or add categories
          q: query, // Search query
        },
      });
      setArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news articles');
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchNews(term);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center my-5">News Reader</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <NewsList articles={articles} />
    </div>
  );
};

export default App;
