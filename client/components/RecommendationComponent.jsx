import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MovieRecommendationModal from "./MovieRecomendationModal";
import {
  sendAnswersToApi,
  setCurrentQuestionIndex,
  setAnswers,
  resetMovieData,
  setError
} from "../utils/filmfindrSlice";
import "./style.css";

const RecommendationComponent = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.myReducers.answers);
  const movieData = useSelector((state) => state.myReducers.movieData);
  const error = useSelector((state) => state.myReducers.error);

  // const resendAnswersToApi = async (answers) => {
  //   try {
  //     const response = await fetch('', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(answers),
  //     });

  //     if (!response.ok) {
  //       throw new Error('HTTP error ' + response.status);
  //     }
  //     const data = await response.json();
  //     setMovieData(data);

  //   } catch (error) {
  //     console.error('Failed to send answers:', error);
  //   }
  //   console.log(answers);
  // };

  

  useEffect(() => {
      if (
        error === 'Gemini servers are overloaded. Please try again' ||
        error === 'Having problems with TMDB. Please try again'
      ) {
        if (window.confirm('The server is busy at the moment. Would you like to retry?')) {
          dispatch(sendAnswersToApi(answers));
        }
      }
  }, [error, dispatch]);

  const resetRecommendations = () => {
    dispatch(resetMovieData());
    dispatch(setAnswers({}));
    dispatch(setError(null));
    dispatch(setCurrentQuestionIndex(0));

  };

  return (
    <>
    <div className='flex flex-col items-center justify-center bg-black text-gray-200'>
      {movieData.length > 0 && (
        <div className='flex flex-col items-center justify-center bg-black text-gray-200 p-10 m-4'>
          <div className='flex items-center justify-center'>
          <button onClick={() => {
            resetRecommendations();
            window.scrollTo(0, 0);
          }} className='bg-gray-800 hover:bg-red-600 text-gray-200 font-bold py-2 px-4 m-10 rounded'>
            Looking for something different?
          </button>
          <button onClick={() => dispatch(sendAnswersToApi(answers))} className='bg-gray-800 hover:bg-red-600 text-gray-200 font-bold py-2 px-4 m-10 rounded'>
            More Recommendations
          </button>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {movieData.map((movie, index) => (
              <MovieRecommendationModal key={index} movie={movie} />
            ))}
          </div>

        </div>
      )}
          </div>
    </>

  );
};

export default RecommendationComponent;
