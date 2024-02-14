import { average } from "./average";

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched
      .filter((movie) => movie.imdbRating && movie.imdbRating > 0)
      .map((movie) => parseFloat(movie.imdbRating))
  );

  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.filter((movie) => movie.runtime > 0).map((movie) => movie.runtime)
  );

  console.log(watched.avgRuntime);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>
            {watched.length === 1
              ? `${watched.length} movie`
              : `${watched.length} movies`}
          </span>
        </p>
        <p>
          <span>⭐️</span>
          <span>
            {Math.floor(avgImdbRating) === avgImdbRating
              ? avgImdbRating
              : avgImdbRating.toFixed(1)}
          </span>
        </p>
        <p>
          <span>🌟</span>
          <span>
            {Math.floor(avgUserRating) === avgUserRating
              ? avgUserRating
              : avgUserRating.toFixed(1)}
          </span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} mins</span>
        </p>
      </div>
    </div>
  );
}
