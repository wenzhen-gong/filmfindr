import MovieRecommendationModal from './MovieRecomendationModal';
import './style.css';



const RecommendationComponent = ({ answers, setAnswers, movieData, setMovieData, setCurrentQuestionIndex }) => {

  
const resendAnswersToApi = async (answers) => {
  try {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    const data = await response.json();
    setMovieData(data);
    
  } catch (error) {
    console.error('Failed to send answers:', error);
  }
  console.log(answers);
};

const resetRecommendations = () => {
  setMovieData([]);
  setAnswers({});
  setCurrentQuestionIndex(0);
};


return (
  <>
    {movieData.length > 0 && (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold my-5'>Movie Recommendations</h1>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded' onClick={() => resendAnswersToApi(answers)}>More Recommendations</button>
        <div className='grid grid-cols-3 gap-4'>
    {movieData.map((movie, index) => (
      <MovieRecommendationModal key={index} movie={movie} />
    ))}
      </div>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-10 rounded' onClick={resetRecommendations}>Looking for something different?</button>
      </div>
    )}
  </>
);
}

export default RecommendationComponent;