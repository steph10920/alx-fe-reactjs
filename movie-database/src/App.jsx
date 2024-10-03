import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';

function App() {
  const [searchTerm, setSearchTerm] = useState('Marvel');  // Default search term for initial load
  const [movies, setMovies] = useState([]);                // List of movie results
  const [selectedMovie, setSelectedMovie] = useState(null); // Detailed view of selected movie
  const [error, setError] = useState(null);                // Error state

  // Fetch movies based on search term
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError('No movies found.');
      }
    } catch (err) {
      setError('Error fetching movie data.');
    }
  };

  // Fetch details of a single movie
  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      setSelectedMovie(response.data);
    } catch (err) {
      setError('Error fetching movie details.');
    }
  };

  // Handle the search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Fetch movies when search term changes or on initial load
  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Movie Database</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!selectedMovie ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelectMovie={fetchMovieDetails}
            />
          ))}
        </div>
      ) : (
        <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;
