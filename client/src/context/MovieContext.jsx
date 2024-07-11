import { createContext, useContext, useEffect, useState } from "react";
import { getAllMovies } from "../api/movieRequests";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data);
    });
  }, [setMovies]);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
