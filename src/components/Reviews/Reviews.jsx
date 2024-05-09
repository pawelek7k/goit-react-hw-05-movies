import PropTypes from "prop-types";

export const Reviews = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review.content}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};
