import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({
  watched,
  onDeleteWatchedMovie,
  onSelectMovie,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
