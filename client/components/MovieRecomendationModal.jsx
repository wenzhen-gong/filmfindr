import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const MovieRecommendationModal = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
  const [isWatched, setIsWatched] = useState(false);

  const handleReview = (event) => {
    event.preventDefault();
    const review = event.target[0].value;
    setReviews(review);
    event.target[0].value = "";
  };

  const handleReviewDelete = () => {
    setReviews(null);
  };

  const handleWatched = (event) => {
    setIsWatched(!isWatched);
    setReviews(null);
    setRating(0);
    // call addMovie
  };
  return (
    <div className="recommendation-container">
      <FontAwesomeIcon
        icon={faHeart}
        color={isWatched || isHovered ? "red" : "grey"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleWatched()}
      />
      <h3>{movie.title}</h3>
      <img src={movie.image} alt={movie.title} />
      <form onSubmit={(event) => handleReview(event)} name="recommendations">
        <input type="text" placeholder="Add a review" />
        <button type="submit">Submit</button>
        <p>Reviews:</p>
        {reviews && (
          <div>
            {reviews}
            <button type="button" onClick={() => handleReviewDelete()}>
              X
            </button>
          </div>
        )}
      </form>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: "none" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MovieRecommendationModal;
