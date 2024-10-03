function MovieDetails({ movie, onBack }) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <button onClick={onBack} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Back to List
        </button>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-96 object-cover mb-4" />
        <h2 className="text-3xl font-bold mb-4">{movie.Title}</h2>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Released:</strong> {movie.Released}</p>
        <p><strong>Ratings:</strong> {movie.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
      </div>
    );
  }
  
  export default MovieDetails;
  