import PropTypes from "prop-types";

export const SectionText = ({ text }) => {
  return <h2>{text}</h2>;
};

SectionText.propTypes = {
  text: PropTypes.string.isRequired,
};
