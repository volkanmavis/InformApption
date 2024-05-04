import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/css/savedQuestions.css'

function SavedQuestions() {
    const [questions, setQuestions] = useState([]);

    const getAllQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:8000/questions/allquestions");
            setQuestions(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        getAllQuestions();
    }, []);

    const deleteQuestion = async (questionId) => {
        try {
            await axios.delete(`http://localhost:8000/questions/${questionId}`);
            setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== questionId));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const confirmDeleteQuestion = (questionId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this question?');
        if (isConfirmed) {
            deleteQuestion(questionId);
        }
    };

    return (
        <div className='all-questions'>
        <div className='container'>
            {questions.map((question) => (
                <div className='card' key={question._id}>
                    <p><b>Category:</b> {question.category}</p>
                    <p><b>Difficulty:</b> {question.difficulty}</p>
                    <p><b>Question:</b> {question.question}</p>
                    <p><b>Answer:</b> {question.correctAnswer}</p>
                    <p><b>Incorrect Answers:</b> {question.IncorrectAnswers}</p>
                    <button onClick={() => confirmDeleteQuestion(question._id)}>Delete</button>
                </div>
            ))}
        </div>
        </div>
    );
}

export default SavedQuestions;
