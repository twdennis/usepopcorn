import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { KEY } from "./KEY";
import { Spinner } from "./Spinner";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const alreadyWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
  } = movieDetails;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetails(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = isLoading ? "Loading... ⏳" : `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [isLoading, title]
  );

  useEffect(
    function () {
      function escapeClose(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", escapeClose);

      return function () {
        document.removeEventListener("keydown", escapeClose);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              ⇦
            </button>
            {poster !== "N/A" ? (
              <img src={poster} alt={`poster of ${title} movie`} />
            ) : (
              <img
                src="https://serpstat.com/files/img/34/1676542462.4999.png"
                alt="no poster for this movie"
              />
            )}
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!alreadyWatched ? (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating="10"
                    size="24"
                    color="gold"
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie: {watchedUserRating} <span>🌟</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
