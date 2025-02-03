import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import Results from "./components/Result";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummery from "./components/WatchedSummery";
import Loader from "./components/Loader";
import { KEY } from "./constants";
import ErrorMessage from "./components/ErrorMessage";
import useDebounce from "./hooks/useDebounce";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`);

          if (!response.ok) throw new Error("Something went wrong with fetching movies!");

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (debouncedQuery.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [debouncedQuery]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
          ) : (
            <WatchedSummery watched={watched} />
          )}
        </Box>
      </Main>
    </>
  );
}
