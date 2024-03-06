import { useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import ReactQuestions from './components/ReactQuestions';
import RecommendationComponent from './components/RecommendationComponent';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [movieData, setMovieData] = useState([{picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw', title: 'Spiderman',  genre: 'Action', description: 'A young Peter Parker/Spider',reason: 'good stuff'}, {picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw', title: 'Spiderman',  genre: 'Action', description: 'A young Peter Parker/Spider',reason: 'good stuff'}, {picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw', title: 'Spiderman',  genre: 'Action', description: 'A young Peter Parker/Spider',reason: 'good stuff'}]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ReactQuestions 
          answers={answers} 
          setAnswers={setAnswers} 
          setMovieData={setMovieData} 
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        <RecommendationComponent 
          answers={answers}
          setAnswers={setAnswers} 
          movieData={movieData} 
          setMovieData={setMovieData}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        <Link to="about">About Us</Link>
        <Link to="err">Error Page</Link>
      </header>
    </div>
  );
}

export default App;
