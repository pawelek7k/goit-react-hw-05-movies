import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetails = ({ apiKey }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [apiKey, movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt=""
          width="400"
        />
      )}
      <p>{movie.overview}</p>
    </div>
  );
};

MovieDetails.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
