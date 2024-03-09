import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons";
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
    if (!review.trim()) {
      event.target[0].value = "";
      return;
    }
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
    <div className='flex flex-col items-center p-4 bg-gray-800 text-gray-200 rounded shadow'>
      <div className='flex flex-col pb-5'>
      <span className="flex justify-center font-bold ml-2 text-lg p-2 text-center">Watched?</span> 
      <FontAwesomeIcon
        icon={faEye}
        className={`text-lg cursor-pointer ${isWatched || isHovered ? 'text-red-500' : 'text-gray-500'}`}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        onClick={handleWatched}
      />
      </div>
      <h3 className='mt-2 text-xl font-bold'>{movie.title}</h3>
      <img className='mt-2 rounded' src={movie.image} alt={movie.title}/>
      
      {isWatched && (
  <>
    <form className='mt-2 w-full' onSubmit={handleReview} name='recommendations'>
      <input className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white text-center' type="text" placeholder="Add a review" maxLength="40"/>
      <button className='mt-2 w-full p-2 hover:bg-red-600 bg-red-500 text-white rounded' type='submit'>Submit</button>
     
      <p className='mt-2 font-bold'>Reviews:</p>
      {reviews && <div className='mt-2 w-full mx-auto flex flex-col items-center'><div className='flex justify-between items-center border-b py-2 w-full'>{reviews}<button className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600' type='button' onClick={() => handleReviewDelete()}>X</button></div> </div>}
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
              className={`mr-1 cursor-pointer ${ratingValue <= (hover || rating) ? "text-red-500" : "text-gray-300"}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  </>
)}
    </div>
  );
};

export default MovieRecommendationModal;
