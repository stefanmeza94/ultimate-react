import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import InputSearch from "./components/InputSerach";
import Results from "./components/Result";
import { tempMovieData, tempWatchedData } from "./data";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummery from "./components/WatchedSummery";
import WatchedMoviesList from "./components/WatchedMoviesList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <InputSearch />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummery watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

// natavi od 115. Building a Reusable Star Rating Component
