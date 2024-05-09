import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Cast } from "../Cast/Cast";
import { Reviews } from "../Reviews/Reviews";
import { SectionText } from "../SectionText/Sectiontext";

export const MovieDetails = ({ apiKey }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

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

    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cast details");
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error("Failed to fetch cast details:", error);
      }
    };

    fetchMovieDetails();
    fetchCast();
  }, [apiKey, movieId]);

  const toggleCast = () => {
    setShowCast(!showCast);
    if (!showCast) {
      setShowReviews(false);
    }
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set("tab", "cast");
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${urlSearchParams.toString()}`
    );
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
    if (!showReviews) {
      setShowCast(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <SectionText text={movie.title} />
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt=""
            width="400"
          />
        )}
        <SectionText text="Overview" />
        <p>{movie.overview}</p>
        <SectionText text="Genres" />
        <ul>
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <SectionText text="Additional Information" />
        <button onClick={toggleCast}>Toggle Cast</button>
        {showCast && <Cast cast={cast} />}
        <button onClick={toggleReviews}>Toggle Reviews</button>
        {showReviews && <Reviews apiKey={apiKey} movieId={movieId} />}
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
