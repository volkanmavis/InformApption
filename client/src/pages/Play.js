import React, { useState, useEffect } from 'react';
import '../pages/css/play.css'

function Play(){
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = () => {
    // Fetch all questions from the backend API
    fetch('http://localhost:8000/questions/allquestions')
      .then(response => response.json())
      .then(data => {
        // Assuming 'data' is an array containing all the questions
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const randomQuestion = data.data[randomIndex];
        setCurrentQuestion(randomQuestion);
        
      })
      .catch(error => {
        console.error('Error fetching question:', error);
      });
  };
  

  const checkAnswer = (selectedAnswer) => {
    if (currentQuestion && currentQuestion.incorrectAnswers && Array.isArray(currentQuestion.incorrectAnswers)) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        fetchRandomQuestion(); // Fetch next random question
        setSelectedOption(null); // Reset selected option
      } else {
        setIsGameOver(true);
      }
    } else {
      console.error('Invalid current question format or incorrectAnswers is not an array.');
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    checkAnswer(option);
  };

  const restartGame = () => {
    fetchRandomQuestion(); 
  };

  return (
    <div className='play-container'>
      {isGameOver ? (
        <div className='game-over'>
          <h2>Game Over!</h2>
          <p>You picked the wrong answer.</p>
          <button onClick={restartGame}>Try Again!</button>
        </div>
      ) : (
        <div className='game-screen'>
          {currentQuestion && (
            <div>
              <h2>{currentQuestion.question}</h2>
              <ul className='choices'>
                {currentQuestion.incorrectAnswers && currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).map((option, index) => (
                  <li key={index}>
                    <button onClick={() => handleOptionSelect(option)}>{option}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Play;
