import { Link } from "react-router-dom";
import StyledHeader from "./HeaderStyled";

export const Header = () => {
  return (
    <StyledHeader>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};
