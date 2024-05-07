import PropTypes from "prop-types";
import { useState } from "react";
import { ListContent } from "../ListContent/ListContent";

export const ApiMovieSection = ({ apiKey }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const getSearches = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <form onSubmit={getSearches}>
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
        {error && <p>Error: {error}</p>}
      </form>
      <ListContent movies={movies} />
    </>
  );
};

ApiMovieSection.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
