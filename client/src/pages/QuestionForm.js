import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages/css/questionForm.css'

function QuestionForm() {
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState(['', '', '']);

  let token = localStorage.getItem('token');

  const createQuestion = async (event) => {
    try {
      event.preventDefault();
      const questionInfo = {
        category,
        difficulty,
        question,
        correctAnswer,
        incorrectAnswers: incorrectAnswers.filter(Boolean) // Filter out empty strings
      };
      console.log(questionInfo)
      event.preventDefault();
      let res = await axios.post('http://localhost:8000/questions/create', questionInfo, {
        headers: { Authorization: `${token}` },
      });

      navigate('/adminpage');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleIncorrectAnswerChange = (index, value) => {
    const updatedAnswers = [...incorrectAnswers];
    updatedAnswers[index] = value;
    setIncorrectAnswers(updatedAnswers);
  };


  const categoryOptions = ["Animals", "Art", "Cinema", "Entertainment", "General Knowledge", "Geography", "History", "Literature", "Music", "Science", "Sport"];
  const difficultyOptions = ["Easy", "Medium", "Hard"];

  return (
    <div className='question-form'>
      <form onSubmit={createQuestion}>
        <div className='category'>
          <select name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>Select Category</option>
            {categoryOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value=''>Select Difficulty</option>
            {difficultyOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className='question'
          placeholder='Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          className='answer'
          placeholder='Correct Answer'
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        {incorrectAnswers.map((value, index) => (
          <input
            key={index}
            className='incorrect-answer'
            placeholder={`Incorrect Answer ${index + 1}`}
            value={value}
            onChange={(e) => handleIncorrectAnswerChange(index, e.target.value)}
          />
        ))}
        <input className='submit' type='submit' value='Create Question' />
      </form>
    </div>
  );
}

export default QuestionForm;
