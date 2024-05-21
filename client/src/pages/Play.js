import React, { useState, useEffect } from 'react';
import '../pages/css/play.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Play() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState(null);
  const [canPlay, setCanPlay] = useState(true); // New state

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

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/users/canPlay/${userId}`)
        .then(response => {
          setCanPlay(response.data.canPlay);
        })
        .catch(error => {
          console.error('Error checking play eligibility:', error);
        });
    }
  }, [userId]);

  const fetchRandomQuestion = () => {
    setTimer(15);

    fetch('http://localhost:8000/questions/allquestions')
      .then(response => response.json())
      .then(data => {
        const questionDifficulty = data.data.filter(question => question.difficulty === `${choice}`);
        const randomIndex = Math.floor(Math.random() * questionDifficulty.length);
        const randomQuestion = questionDifficulty[randomIndex];

        const answerChoices = [...randomQuestion.incorrectAnswers, randomQuestion.correctAnswer];
        for (let i = answerChoices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answerChoices[i], answerChoices[j]] = [answerChoices[j], answerChoices[i]];
        }

        randomQuestion.answerChoices = answerChoices;

        setCurrentQuestion(randomQuestion);
      })
      .catch(error => {
        console.error('Error fetching question:', error);
      });
  };

  const checkAnswer = (selectedAnswer) => {
    if (currentQuestion && currentQuestion.answerChoices && Array.isArray(currentQuestion.answerChoices)) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 10);
        fetchRandomQuestion();
        setSelectedOption(null);
      } else {
        setIsGameOver(true);
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
      console.error('Invalid current question format or answerChoices is not an array.');
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
      {!canPlay ? ( // If the user cannot play, show a message
        <div className='play-limit-message'>
          <h2>You have reached the play limit for today. Please come back tomorrow!</h2>
        </div>
      ) : choice === null ? ( // Ask for difficulty choice if not chosen
        <div className='difficulty-selection'>
          <h1 className='game-heading'>Choose Your Difficulty</h1>
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
              <h2 id='score'>Score: {score}</h2>
            </div>
            {currentQuestion && (
              <div className='question-answer'>
                <h2>{currentQuestion.question}</h2>

                <ul className='choices'>
                  {currentQuestion.answerChoices.map((option, index) => (
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
