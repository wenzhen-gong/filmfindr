import React, { useState } from 'react'
import ReactQuestions from './ReactQuestions';
import RecommendationComponent from './RecommendationComponent';


export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [movieData, setMovieData] = useState([{picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw', title: 'Spiderman',  genre: 'Action', description: 'A young Peter Parker/Spider',reason: 'good stuff'}, {picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw', title: 'Spiderman',  genre: 'Action', description: 'A young Peter Parker/Spider',reason: 'good stuff'}, {picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw', title: 'Spiderman',  genre: 'Action', description: 'A young Peter Parker/Spider',reason: 'good stuff'}]);
  return (
    <div>
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
    </div>
  )
}
