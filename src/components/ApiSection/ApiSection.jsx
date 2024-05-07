import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ListContent } from "../ListContent/ListContent";
import { SectionText } from "../SectionText/Sectiontext";

export const ApiSection = ({ apiKey }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trending movies");
        }
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [apiKey]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <SectionText text="Trending today" />
      {trendingMovies.length > 0 ? (
        <ListContent movies={trendingMovies} />
      ) : (
        <p>No trending movies available</p>
      )}
    </>
  );
};

ApiSection.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
