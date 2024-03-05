import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart} from '@fortawesome/free-solid-svg-icons'
import '../App.css'



const RecommendationComponent = ({ answers }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleFavorite = (event) => {
    setIsFavorite(!isFavorite);
  };

  const handleReview = (event) => {
    event.preventDefault();
    const review = event.target[0].value;
    setReviews([...reviews, review]);
    event.target[0].value = '';
  };

  const handleReviewDelete = (index) => {
    const newReviews = reviews.filter((review, i) => i !== index);
    setReviews(newReviews);
  };



return (
    <div>
      <button>Reset Recommendations</button>
      <h1>Movie Recommendations</h1>
        <div className='recommendation-container'>
        <FontAwesomeIcon
          icon={faHeart}
          color={isFavorite || isHovered ? 'red' : 'grey'}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          onClick={handleFavorite}
        />
          <h3>Movie Title</h3>
          <img alt='spiderman'/>
          <form onSubmit={handleReview}>
            <input type="text" placeholder="Add a review" />
            <button type='submit'>Submit</button>
            <p>Reviews:</p>
            {reviews.length > 0 && <ul>{reviews.map((review, index) => <li key={index}>{review} <button type='button' onClick={() => handleReviewDelete(index)}>X</button></li>)}</ul>}
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
                style={{ display: 'none' }}
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
      <button>Looking for something different?</button>
    </div>
  
  );
};

export default RecommendationComponent;