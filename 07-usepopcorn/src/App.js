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

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");

  const query = "antman";

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!response.ok) throw new Error("Something went wrong with fetching movies!");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Search />
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
        </Box>
      </Main>
    </>
  );
}
