import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart} from '@fortawesome/free-solid-svg-icons'
import './style.css';

const MovieRecommendationModal = ({ movie }) => {
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
    <div className='flex flex-col items-center p-4 bg-white rounded shadow'>
      <FontAwesomeIcon
        icon={faHeart}
        className={`text-lg cursor-pointer ${isFavorite || isHovered ? 'text-red-500' : 'text-gray-500'}`}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        onClick={handleFavorite}
      />
      <h3 className='mt-2 text-xl font-bold'>{movie.title}</h3>
      <img className='mt-2 rounded' src={movie.image} alt={movie.title}/>
      <form className='mt-2 w-full' onSubmit={handleReview} name='recommendations'>
        <input className='w-full p-2 border rounded' type="text" placeholder="Add a review" />
        <button className='mt-2 w-full p-2 hover:bg-blue-700 bg-blue-500 text-white rounded' type='submit'>Submit</button>
        <p className='mt-2 font-bold'>Reviews:</p>
        {reviews.length > 0 && <ul className='mt-2'>{reviews.map((review, index) => <li className='flex justify-between mt-1' key={index}>{review} <button className='ml-2 text-red-500' type='button' onClick={() => handleReviewDelete(index)}>X</button></li>)}</ul>}
      </form>
      <div className='flex mt-2'>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className='sr-only'
              />
              <FontAwesomeIcon
                icon={faStar}
                className={`mr-1 cursor-pointer ${ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default MovieRecommendationModal;