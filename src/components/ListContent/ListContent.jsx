import PropTypes from "prop-types";
import { ItemContent } from "../ItemContent/ItemContent";
export const ListContent = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <ItemContent key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};
ListContent.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
