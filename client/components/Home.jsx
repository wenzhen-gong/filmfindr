import React from "react";
import ReactQuestions from "./ReactQuestions";
import RecommendationComponent from "./RecommendationComponent";
export default function Home() {
  return (
    <div>
      <ReactQuestions
        // answers={answers}
        // setAnswers={setAnswers}
        // setMovieData={setMovieData}
        // currentQuestionIndex={currentQuestionIndex}
        // setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
      <RecommendationComponent
        // answers={answers}
        // setAnswers={setAnswers}
        // movieData={movieData}
        // setMovieData={setMovieData}
        // setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}
