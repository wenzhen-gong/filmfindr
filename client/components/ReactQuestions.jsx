import { useState } from 'react';
import './style.css';


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



  const ReactQuestions = ({answers, setAnswers, setMovieData, currentQuestionIndex, setCurrentQuestionIndex}) => {
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
      if (currentQuestionIndex < inputs.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const sendAnswersToApi = async (answers) => {
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
        };
        console.log(answers);
        sendAnswersToApi(answers);
        setCurrentQuestionIndex(currentQuestionIndex + 1)
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
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-bold mb-8'>Movie Questions</h1>
          <form onSubmit={handleNext} name='questions' className='w-full max-w-md bg-white p-6 rounded shadow-md'>
            <h3 className='flex items-align text-xl font-semibold mb-4'>{currentQuestion.question}</h3>
            {currentQuestion.type === 'text' ? (
              <input type="text" placeholder={currentQuestion.placeholder} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} className='w-full p-2 border border-gray-300 rounded mb-4' />
            ) : (
              currentQuestion.options.map((option, index) => (
                <div key={index} className='flex items-center mb-2'>
                  <input 
                    type={currentQuestion.type} 
                    id={option} 
                    name={`question_${currentQuestionIndex}`} 
                    value={option} 
                    onChange={handleChange} 
                    checked={currentQuestion.type === 'checkbox' ? (answers[`question_${currentQuestionIndex + 1}`] || []).includes(option) : answers[`question_${currentQuestionIndex + 1}`] === option}
                    className='mr-2'
                  />
                  <label htmlFor={option} className='text-gray-700'>{option}</label>
                </div>
              ))
            )}
            <div className='flex justify-between'>
              {currentQuestionIndex >= 0 && <button type="button" onClick={handlePrevious} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Back</button>}
              {currentQuestionIndex === 5 && <button type="button" onClick={handleList} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>Add</button>}
              <button type="submit" className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600'>Next</button>
            </div>
            {movieRec.length > 0 && <ul className='mt-4'>{movieRec.map((movie, index) => <li key={index} className='flex justify-between items-center border-b py-2'>{movie} <button type='button' onClick={() => handleListDelete(index)} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>X</button></li>)}</ul>}
            {error && <p className='text-red-500 mt-2'>{error}</p>}
          </form>
          
          {answers && <p className='mt-4 text-center'>{JSON.stringify(answers)}</p>}
        </div>
      )
    );
  }

  export default ReactQuestions;