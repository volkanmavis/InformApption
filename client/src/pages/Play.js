import React, { useState, useEffect } from 'react';
import '../pages/css/play.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Change to import jwtDecode from 'jwt-decode';

function Play() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState(null);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;
  

  useEffect(() => {
    if (choice !== null) {
      fetchRandomQuestion();
    }
  }, [choice]);

  useEffect(() => {
    let interval;
    if (!isGameOver && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (!isGameOver && timer === 0) {
      setIsGameOver(true);
    }
    return () => clearInterval(interval);
  }, [timer, isGameOver]);

  const fetchRandomQuestion = () => {
    // Reset timer
    setTimer(15);

    // Fetch all questions from the backend API
    fetch('http://localhost:8000/questions/allquestions')
      .then(response => response.json())
      .then(data => {
        // Assuming 'data' is an array containing all the questions
        const questionDifficulty = data.data.filter(question => question.difficulty === `${choice}`);
        const randomIndex = Math.floor(Math.random() * questionDifficulty.length);
        const randomQuestion = questionDifficulty[randomIndex];
        setCurrentQuestion(randomQuestion);
      })
      .catch(error => {
        console.error('Error fetching question:', error);
      });
  };

  const checkAnswer = (selectedAnswer) => {
    if (currentQuestion && currentQuestion.incorrectAnswers && Array.isArray(currentQuestion.incorrectAnswers)) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 10); // Increase score by 10 for correct answer
        fetchRandomQuestion(); // Fetch next random question
        setSelectedOption(null); // Reset selected option
      } else {
        setIsGameOver(true);
        // Send score to backend
        if (userId) {
          axios.post('http://localhost:8000/users/updateScore', { userId, score, choice })
            .then(response => {
              console.log('Score updated successfully.');
            })
            .catch(error => {
              console.error('Error updating score:', error);
            });
        }
      }
    } else {
      console.error('Invalid current question format or incorrectAnswers is not an array.');
    }
  };

  const startGame = (chosenDifficulty) => {
    setChoice(chosenDifficulty);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    checkAnswer(option);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setScore(0);
    fetchRandomQuestion();
  };

  return (
    <div className='play-container'>
      {choice === null ? ( // Ask for difficulty choice if not chosen
        <div className='difficulty-selection'>
          <h1 className='game-heading'>Choose Your Poison</h1>
          <div className='difficulty-buttons'>
            <button id='easy' onClick={() => startGame('easy')}>EASY</button>
            <button id='medium' onClick={() => startGame('medium')}>MEDIUM</button>
            <button id='hard' onClick={() => startGame('hard')}>HARD</button>
          </div>
        </div>
      ) : isGameOver ? (
        <div className='game-over'>
          <h2>Game Over!</h2>
          <p>You picked the wrong answer or time ran out.</p>
          <p>Your score: {score}</p> 
          <button className='try-again' onClick={restartGame}>Try Again!</button>
        </div>
      ) : (
        <div className='game-screen'>
          <div>
            <div className='time-score'>
              <h2 id='timer'>Time: {timer} </h2>
              <h2>Score: {score}</h2> 
            </div>
            {currentQuestion && (
              <div className='question-answer'>
                <h2>{currentQuestion.question}</h2>
                
                <ul className='choices'>
                  {currentQuestion.incorrectAnswers && currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).map((option, index) => (
                    <li key={index}>
                      <button className='answer-button' onClick={() => handleOptionSelect(option)}>{option}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default Play;
