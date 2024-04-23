import { useCallback, useState } from "react";
import { SearchPrompt } from "./SearchPrompt";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { useMovieFetch } from "./useMovieFetch";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watchedListOpen, setWatchedListOpen] = useState(true);

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, error } = useMovieFetch(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function toggleWatchedListOpen() {
    setWatchedListOpen(!watchedListOpen);
  }

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {query.length < 3 && <SearchPrompt query={query} />}
          {isLoading && <Spinner />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary
                watched={watched}
                handleToggleOpen={toggleWatchedListOpen}
                watchedListOpen={watchedListOpen}
              />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
                onSelectMovie={handleSelectMovie}
                watchedListOpen={watchedListOpen}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
