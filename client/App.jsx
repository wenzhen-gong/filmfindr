import { useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import ReactQuestions from './components/ReactQuestions';
import RecommendationComponent from './components/RecommendationComponent';

function App() {
  const [answers, setAnswers] = useState({});

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
        <ReactQuestions answers={answers} setAnswers={setAnswers} />
        <RecommendationComponent answers={answers}/>
        <Link to="about">About Us</Link>
        <Link to="err">Error Page</Link>
      </header>
    </div>
  );
}

export default App;
