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
  const [canPlay, setCanPlay] = useState(true);
  const [failedAttempts, setFailedAttempts] = useState(0);

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
          const { canPlay, failedAttempts } = response.data;
          setCanPlay(canPlay);
          setFailedAttempts(failedAttempts);
          localStorage.setItem('canPlay', canPlay);
          localStorage.setItem('failedAttempts', failedAttempts);
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

          axios.post('http://localhost:8000/users/updateFailedAttempts', { userId })
            .then(response => {
              const updatedFailedAttempts = response.data.failedAttempts;
              setFailedAttempts(updatedFailedAttempts);
              localStorage.setItem('failedAttempts', updatedFailedAttempts);
              if (updatedFailedAttempts >= 3) {
                setCanPlay(false);
                localStorage.setItem('canPlay', 'false');
              }
              console.log('Failed attempt recorded.');
            })
            .catch(error => {
              console.error('Error recording failed attempt:', error);
            });
        }
      }
    } else {
      console.error('Invalid current question format or answerChoices is not an array.');
    }
  };

  const startGame = (chosenDifficulty) => {
    if (failedAttempts >= 3) {
      setCanPlay(false);
      localStorage.setItem('canPlay', 'false');
    } else {
      setChoice(chosenDifficulty);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    checkAnswer(option);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setScore(0);
    setChoice(null);
    setFailedAttempts(0);
    setCanPlay(true);
    localStorage.setItem('failedAttempts', '0');
    localStorage.setItem('canPlay', 'true');
    axios.post('http://localhost:8000/users/resetFailedAttempts', { userId })
      .then(response => {
        console.log('Failed attempts reset successfully.');
      })
      .catch(error => {
        console.error('Error resetting failed attempts:', error);
      });
  };

  return (
    <div className='play-container'>
      {canPlay ? ( // Check if the user can play
        choice === null ? ( // Ask for difficulty choice if not chosen
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
        )
      ) : (
        <div className='play-limit-message'>
          <h2>You have reached the play limit for today. Please come back tomorrow!</h2>
        </div>
      )}
    </div>
  );
}

export default Play;
