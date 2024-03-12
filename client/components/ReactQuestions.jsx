import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setError,
  sendAnswersToApi,
  setCurrentQuestionIndex,
  setAnswers,
  setCurrentInput,
  setMovieRec,
} from "../utils/filmfindrSlice";
import "./style.css";

const inputs = [
  {
    question: "How are you today?",
    type: "radio",
    options: ["Good", "Bad", "So-so"],
  },
  {
    question: "What comes closest to your occasion?",
    type: "radio",
    options: [
      "Just watching a movie by myself",
      "A movie at the cinemas",
      "Movie Night with Friends",
      "Date night with partner",
      "Watching a movie with family or relatives",
    ],
  },
  {
    question: "Choose any genres you’re currently open to watching",
    type: "checkbox",
    options: [
      "Action",
      "Adventure",
      "Comedy",
      "Crime",
      "Drama",
      "Fantasy",
      "Historical",
      "Horror",
      "Mystery",
      "Romance",
      "Science Fiction",
      "Thriller",
      "Western",
      "Other",
    ],
  },
  {
    question: "How old would you like the movie to be?",
    type: "radio",
    options: [
      "Older than 20 years",
      "Older than 10 years",
      "Older than 5 years",
      "Older than 2 years",
      "Newer than 2 years",
    ],
  },
  {
    question:
      "Is the age-appropriateness rating of the movie important to you?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "(Optional) Please add some other movies you're interested in:",
    type: "text",
    placeholder: "Movie Title",
  },
];

// const ReactQuestions = ({answers, setAnswers, setMovieData, currentQuestionIndex, setCurrentQuestionIndex}) => {
const ReactQuestions = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.myReducers.answers);
  const currentQuestionIndex = useSelector(
    (state) => state.myReducers.currentQuestionIndex
  );
  const error = useSelector((state) => state.myReducers.error);
  const currentInput = useSelector((state) => state.myReducers.currentInput);
  const movieRec = useSelector((state) => state.myReducers.movieRec);

  const currentQuestion = inputs[currentQuestionIndex];

  const handleNext = (event) => {
    event.preventDefault();
    const name = `question_${currentQuestionIndex + 1}`;
    if (!answers[name] && currentQuestion.type !== "text") {
      dispatch(setError("Please select an option"));
      return;
    }
    if (
      currentQuestion.type === "checkbox" &&
      !Object.values(answers[name]).some((value) => value)
    ) {
      dispatch(setError("Please select at least one option"));
      return;
    }
    dispatch(setError(null));
    if (currentQuestionIndex < inputs.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      // const sendAnswersToApi = async (answers) => {
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
      // };
      console.log(answers);
      dispatch(sendAnswersToApi(answers));
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    }
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    if (currentQuestionIndex > 0) {
      // setAnswers(prevAnswers => {
      //   const newAnswers = { ...prevAnswers };
      //   delete newAnswers[`question_${currentQuestionIndex + 1}`];
      //   return newAnswers;
      // });
      // // setAnswers can take null, object as action.payload and follows different logic accordingly. In case of object, logic depends on value of type property.
      dispatch(setAnswers());
      dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
      dispatch(setMovieRec([]));
    }
  };

  const handleChange = (event) => {
    const { value, checked, type } = event.target;

    // // all logics has been
    // const name = `question_${currentQuestionIndex + 1}`;
    // if (type === 'checkbox') {
    //   setAnswers(prevAnswers => {
    //     const previousCheckedOptions = prevAnswers[name] || [];
    //     const newCheckedOptions = checked
    //       ? [...previousCheckedOptions, value]
    //       : previousCheckedOptions.filter(option => option !== value);
    //     return {
    //       ...prevAnswers,
    //       [name]: newCheckedOptions
    //     };
    //   });
    // } else {
    //   setAnswers(prevAnswers => ({
    //     ...prevAnswers,
    //     [name]: value
    //   }));

    // }
    dispatch(setAnswers({ value, checked, type }));
  };

  const handleList = (event) => {
    event.preventDefault();

    if (!currentInput || currentInput.trim() === "") {
      dispatch(setError("Please enter a movie"));
      return;
    }

    // const newMovieRec = [...movieRec, currentInput];
    // // setMovieRec can take either string or number as payload, and follows different logics accordingly
    dispatch(setMovieRec(currentInput));
    // const name = `question_${currentQuestionIndex + 1}`;
    // setAnswers(prevAnswers => ({
    //   ...prevAnswers,
    //   [name]: newMovieRec
    // }));
    dispatch(setAnswers(movieRec));
    dispatch(setCurrentInput(""));
  };

  const handleListDelete = (index) => {
    // const newMovieRec = movieRec.filter((movie, i) => i !== index);
    dispatch(setMovieRec(index));
    // const name = `question_${currentQuestionIndex + 1}`;
    // setAnswers(prevAnswers => ({
    //   ...prevAnswers,
    //   [name]: newMovieRec
    // }));
    dispatch(setAnswers(movieRec));
  };

  return (
    currentQuestion &&
    currentQuestionIndex <= inputs.length - 1 && (
      <div className="flex flex-col items-center justify-center text-gray-200 w-screen h-screen">
        <h1 className='text-6xl font-bold mb-8'>Movie Questions</h1>
        <form onSubmit={handleNext} name="questions" className={`flex flex-col space-between bg-gray-800 w-[80vw] p-10 rounded shadow-md`}>
          <div className='flex flex-col space-between'>
            <h3 className='flex justify-center items-align text-4xl font-semibold mb-4'>{currentQuestion.question}</h3>
            {currentQuestion.type === "text" ? (
              <input
                type="text"
                placeholder={currentQuestion.placeholder}
                value={currentInput}
                onChange={(e) => dispatch(setCurrentInput(e.target.value))}
                className='p-2 w-full border border-gray-600 rounded mb-4 bg-gray-700 text-white text-center mx-auto'
              />
            ) : (
              currentQuestion.options.map((option, index) => (
                <div key={index} className='flex justify-center items-center text-2xl mb-2'>
                  <input
                    type={currentQuestion.type}
                    id={option}
                    name={`question_${currentQuestionIndex}`}
                    value={option}
                    onChange={handleChange}
                    checked={
                      currentQuestion.type === "checkbox"
                        ? (
                            answers[`question_${currentQuestionIndex + 1}`] || []
                          ).includes(option)
                        : answers[`question_${currentQuestionIndex + 1}`] ===
                          option
                    }
                    className='mr-2 cursor-pointer'
                  />
                  <label htmlFor={option} className='text-gray-300'>{option}</label>
                </div>
              ))
            )}
            <div className='flex justify-between'>
              {currentQuestionIndex >= 0 && (
                <button type="button" onClick={handlePrevious} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
                  Back
                </button>
              )}
              {currentQuestionIndex === 5 && (
                <button type="button" onClick={handleList} className='px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800'>
                  Add
                </button>
              )}
              <button type="submit" className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>Next</button>
            </div>
          </div>
          {movieRec.length > 0 && <ul className='mt-2 w-1/4 mx-auto flex flex-col items-center'>{movieRec.map((movie, index) => <li key={index} className='flex justify-between items-center border-b py-2 w-full'>{movie} <button type='button' onClick={() => handleListDelete(index)} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>X</button></li>)}</ul>}
              {error && <p className='text-red-500 text-2xl font-bold justify-center text-center items-center mt-2'>{error}</p>}
        </form>
        {/* {answers && <p  className='mt-4  text-center'>{JSON.stringify(answers)}</p>} */}
      </div>
    )
  );
};

export default ReactQuestions;