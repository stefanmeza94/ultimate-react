import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import InputSearch from "./components/InputSerach";
import Results from "./components/Result";
import { tempMovieData, tempWatchedData } from "./data";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummery from "./components/WatchedSummery";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const KEY = "a01bbe3f";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const query = "interstellar";

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found!");
        }
        setMovies(data.Search);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <InputSearch />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummery watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
