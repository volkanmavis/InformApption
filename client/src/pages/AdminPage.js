import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const navigate = useNavigate();
    const [fetchError, setFetchError] = useState(null);

    let token = localStorage.getItem('token');

    const fetchAndSaveQuestions = async (event) => {
        try {
            event.preventDefault();
            let token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('Token not found');
            }
    
            // Fetch questions from the API
            const response = await axios.get('https://the-trivia-api.com/v2/questions');
    
            if (!response || !response.data || !Array.isArray(response.data)) {
                throw new Error('Invalid response from the API');
            }
    
            const questions = response.data;
    
            // Transform fetched questions to match your database schema
            const formattedQuestions = questions.map(question => ({
                category: question.category,
                difficulty: question.difficulty,
                question: question.question.text,
                correctAnswer: question.correctAnswer,
                incorrectAnswers: question.incorrectAnswers
            }));
    
            console.log(formattedQuestions);
    
            // Save questions to your database one by one
            for (const formattedQuestion of formattedQuestions) {
                await axios.post('http://localhost:8000/questions/create', formattedQuestion, {
                    headers: { Authorization: `${token}` },
                });
                console.log('Question saved to your database:', formattedQuestion);
            }
    
            console.log('All questions saved to your database');
        } catch (error) {
            console.error('Error fetching and saving questions:', error);
            setFetchError(error.message);
        }
    };
    
    

    return (
        <div>
            <h2>Admin Page</h2>
            <button onClick={fetchAndSaveQuestions}>Submit
            </button>
            {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
        </div>
    );
}

export default AdminPage;
