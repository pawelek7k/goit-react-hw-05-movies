import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ListContent } from "../ListContent/ListContent";
export const ApiMovieSection = ({ apiKey }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchText(query);
      getSearches(query);
    }
  }, [location.search]);

  const getSearches = async (query) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let params = { query: searchText };
    setSearchParams(params);
    navigate({
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
