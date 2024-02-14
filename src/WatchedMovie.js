export function WatchedMovie({ movie, onDeleteWatchedMovie, onSelectMovie }) {
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevent click event from propagating to parent elements
    onDeleteWatchedMovie(id);
  };

  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{Number(movie.imdbRating) > 0 ? movie.imdbRating : "N/A"}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>
            {Number(movie.runtime) > 0 ? `${movie.runtime} mins` : "N/A"}
          </span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={(e) => handleDelete(e, movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}
