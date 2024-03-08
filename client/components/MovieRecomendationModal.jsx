import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleFavorite,
  handleReview,
  handleReviewDelete,
  setIsHovered,
  setHover,
  setRating,
} from "../utils/filmfindrSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const MovieRecommendationModal = ({ movie }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.myReducers.isFavorite);
  const reviews = useSelector((state) => state.myReducers.reviews);
  const isHovered = useSelector(state => state.myReducers.isHovered);
  const hover = useSelector(state => state.myReducers.hover);
  const rating = useSelector(state => state.myReducers.rating);
const [isWatched, setIsWatched] = useState(false);
  // const handleFavorite = (event) => {
  //   setIsFavorite(!isFavorite);
  // };

  // // partially converted to redux reducer
  // const handleReview = (event) => {
  //   event.preventDefault();
  //   const review = event.target[0].value;
  //   setReviews([...reviews, review]);
  //   event.target[0].value = '';
  // };

  // const handleReviewDelete = (index) => {
  //   const newReviews = reviews.filter((review, i) => i !== index);
  //   setReviews(newReviews);
  // };

  const handleWatched = (event) => {
    setIsWatched(!isWatched);
    setReviews([]);
    setRating(0);
  }
  return (
    <div className="recommendation-container">
      <FontAwesomeIcon
        icon={faHeart}
        color={isFavorite || isHovered ? "red" : "grey"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => dispatch(handleFavorite())}
      />
      <h3>{movie.title}</h3>
      <img src={movie.image} alt={movie.title} />
      <form
        onSubmit={(event) => dispatch(handleReview(event))}
        name="recommendations"
      >
        <input type="text" placeholder="Add a review" />
        <button type="submit">Submit</button>
        <p>Reviews:</p>
        {reviews.length > 0 && (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                {review}
                <button type="button" onClick={() => handleReviewDelete(index)}>
                  X
                </button>
              </li>
            ))}
          </ul>
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
