import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Cast } from "../Cast/Cast";
import { Reviews } from "../Reviews/Reviews";
import { SectionText } from "../SectionText/Sectiontext";

export const MovieDetails = ({ apiKey }) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId, tab } = useParams();
  const navigate = useNavigate();
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

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchMovieDetails();
    fetchCast();
    fetchReviews();
  }, [apiKey, movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const referrerFunc = () => {
    console.log(document.referrer, window.location.origin);
    return document.referrer.includes(window.location.origin)
      ? navigate(-1)
      : navigate("/movies");
  };

  return (
    <>
      <div>
        <button onClick={referrerFunc}>go back</button>
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
        <Link to={`/movies/${movieId}/${tab === "cast" ? "" : "cast"}`}>
          Cast <br />
        </Link>
        {tab === "cast" && <Cast cast={cast} />}
        <Link to={`/movies/${movieId}/${tab === "reviews" ? "" : "reviews"}`}>
          Reviews
        </Link>
        {tab === "reviews" && <Reviews reviews={reviews} />}
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
