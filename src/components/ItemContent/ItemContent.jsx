import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ItemContent = ({ movie }) => {
  return (
    <li>
      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
    </li>
  );
};

ItemContent.propTypes = {
  movie: PropTypes.object.isRequired,
};
