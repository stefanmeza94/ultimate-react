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

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = "interstellar";

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      const data = await response.json();

      setMovies(data.Search);
      setIsLoading(false);
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
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
        <Box>
          <WatchedSummery watched={watched} />
        </Box>
      </Main>
    </>
  );
}
