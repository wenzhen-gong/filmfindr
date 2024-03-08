import MovieRecommendationModal from './MovieRecomendationModal';
import '../App.css';



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
      <div>
        <button onClick={() => resendAnswersToApi(answers)}>More Recommendations</button>
        <h1>Movie Recommendations</h1>
        <div className='recommendations-row'>
          {movieData.map((movie, index) => (
            <MovieRecommendationModal key={index} movie={movie} />
          ))}
        </div>
        <button onClick={resetRecommendations}>Looking for something different?</button>
      </div>
    )}
  </>
);
}

export default RecommendationComponent;