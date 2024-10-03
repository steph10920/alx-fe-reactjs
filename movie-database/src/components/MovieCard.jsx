function MovieCard({ movie, onSelectMovie }) {
    return (
      <div
        className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={() => onSelectMovie(movie.imdbID)}
      >
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{movie.Title}</h2>
          <p className="text-gray-600">Year: {movie.Year}</p>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  