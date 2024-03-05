import { useState } from 'react';


const inputs = [
    {
      question: 'How are you today?',
      type: 'radio',
      options: ['Good', 'Bad', 'So-so']
    },
    {
      question: 'What comes closest to your occasion?',
      type: 'radio',
      options: [
        'Just watching a movie by myself',
        'A movie at the cinemas',
        'Movie Night with Friends',
        'Date night with partner',
        'Watching a movie with family or relatives'
      ]
    },
    {
      question: 'Choose any genres you’re currently open to watching',
      type: 'checkbox',
      options: [
        'Action',
        'Adventure',
        'Comedy',
        'Crime',
        'Drama',
        'Fantasy',
        'Historical',
        'Horror',
        'Mystery',
        'Romance',
        'Science Fiction',
        'Thriller',
        'Western',
        'Other'
      ]
    },
    {
      question: 'How old would you like the movie to be?',
      type: 'radio',
      options: [
        'Older than 20 years',
        'Older than 10 years',
        'Older than 5 years',
        'Older than 2 years',
        'Newer than 2 years'
      ]
    },
    {
      question: 'Is the age-appropriateness rating of the movie important to you?',
      type: 'radio',
      options: ['Yes', 'No']
    },
    {
      question: '(Optional) Please add some other movies you\'re interested in:',
      type: 'text',
      placeholder: 'Movie Title',
    }
  ];



  const ReactQuestions = ({answers, setAnswers}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [movieRec, setMovieRec] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [error, setError] = useState(null);
  
    const handleNext = (event) => {
      event.preventDefault();
      const name = `question_${currentQuestionIndex + 1}`;
      if (!answers[name] && currentQuestion.type !== 'text') {
        setError('Please select an option');
        return;
      }
      if (currentQuestion.type === 'checkbox' && !Object.values(answers[name]).some(value => value)) {
        setError('Please select at least one option');
        return;
      }
      setError(null);
      if (currentQuestionIndex <= inputs.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };

    const handlePrevious = (event) => {
      event.preventDefault();
      if (currentQuestionIndex > 0) {
        setAnswers(prevAnswers => {
          const newAnswers = { ...prevAnswers };
          delete newAnswers[`question_${currentQuestionIndex + 1}`];
          return newAnswers;
        });
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };
  
    const handleChange = (event) => {
      const { value, checked, type } = event.target;
      const name = `question_${currentQuestionIndex + 1}`;
    
      if (type === 'checkbox') {
        setAnswers(prevAnswers => {
          const previousCheckedOptions = prevAnswers[name] || [];
          const newCheckedOptions = checked
            ? [...previousCheckedOptions, value]
            : previousCheckedOptions.filter(option => option !== value);
          return {
            ...prevAnswers,
            [name]: newCheckedOptions
          };
        });
      } else {
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [name]: value
        }));
      }
    };

    const handleList = (event) => {
      event.preventDefault();
      if (!currentInput || currentInput.trim() === ''){
        setError('Please enter a movie');
        return;
      }
      const newMovieRec = [...movieRec, currentInput];
      setMovieRec(newMovieRec);
      const name = `question_${currentQuestionIndex + 1}`; 
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [name]: newMovieRec
      }));
      setCurrentInput('');
    };

    const handleListDelete = (index) => {
      const newMovieRec = movieRec.filter((movie, i) => i !== index);
      setMovieRec(newMovieRec);
      const name = `question_${currentQuestionIndex + 1}`; 
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [name]: newMovieRec
      }));
    };
  
    const currentQuestion = inputs[currentQuestionIndex];
  
    return (
      currentQuestion && currentQuestionIndex <= inputs.length - 1 && (
        <div className='questions-container'>
          <h1>Movie Recommendations</h1>
          <form onSubmit={handleNext}>
            <h3>{currentQuestion.question}</h3>
            {currentQuestion.type === 'text' ? (
              <input type="text" placeholder={currentQuestion.placeholder} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} />
            ) : (
              currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <input 
                    type={currentQuestion.type} 
                    id={option} 
                    name={`question_${currentQuestionIndex}`} 
                    value={option} 
                    onChange={handleChange} 
                    checked={currentQuestion.type === 'checkbox' ? (answers[`question_${currentQuestionIndex + 1}`] || []).includes(option) : answers[`question_${currentQuestionIndex + 1}`] === option}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))
            )}
            {currentQuestionIndex >= 0 && <button type="button" onClick={handlePrevious}>Back</button>}
            {currentQuestionIndex === 5 && <button type="button" onClick={handleList}>Add</button>}
            <button type="submit">Next</button>
            {movieRec.length > 0 && <ul>{movieRec.map((movie, index) => <li key={index}>{movie} <button type='button' onClick={() => handleListDelete(index)}>X</button></li>)}</ul>}
            {error && <p>{error}</p>}
          </form>
          
          {answers && <p>{JSON.stringify(answers)}</p>}
        </div>
      )
    );
  }

  export default ReactQuestions;