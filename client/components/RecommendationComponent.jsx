import { useSelector, useDispatch } from "react-redux";
import MovieRecommendationModal from "./MovieRecomendationModal";
import {
  sendAnswersToApi,
  setCurrentQuestionIndex,
  setAnswers,
  resetMovieData,
} from "../utils/filmfindrSlice";
import "./style.css";

const RecommendationComponent = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.myReducers.answers);
  const movieData = useSelector((state) => state.myReducers.movieData);
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

  const resetRecommendations = () => {
    dispatch(resetMovieData());
    dispatch(setAnswers({}));
    dispatch(setCurrentQuestionIndex(0));
  };

  return (
    <>
      {movieData.length > 0 && (
        <div className='flex flex-col items-center justify-center bg-black text-gray-200'>
          <button onClick={() => dispatch(sendAnswersToApi(answers))} className='bg-gray-800 hover:bg-red-600 text-gray-200 font-bold py-2 px-4 m-5 rounded'>
            More Recommendations
          </button>
          <h1 className='text-4xl font-bold my-5 pt-40'>Movie Recommendations</h1>
          <div className='grid grid-cols-3 gap-4'>
            {movieData.map((movie, index) => (
              <MovieRecommendationModal key={index} movie={movie} />
            ))}
          </div>
          <button onClick={resetRecommendations} className='bg-gray-800 hover:bg-red-600 text-gray-200 font-bold py-2 px-4 m-10 rounded'>
            Looking for something different?
          </button>
        </div>
      )}
    </>
  );
};

export default RecommendationComponent;
