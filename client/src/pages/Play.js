import React, { useState } from 'react';

function Play() {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const categoryOptions = ["Animals", "Art", "Cinema", "Entertainment", "General Knowledge", "Geography", "History", "Literature", "Music", "Science", "Sport"];
    const difficultyOptions = ["Easy", "Medium", "Hard"];

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    }

    const handleSubmit = () => {
        // Do something with the selected category and difficulty, like making an API call
        console.log("Category:", category);
        console.log("Difficulty:", difficulty);
    }

    return (
        <div>
            <label htmlFor="category">Choose a category:</label>
            <select id="category" value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categoryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>

            <br />

            <label htmlFor="difficulty">Choose a difficulty:</label>
            <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
                <option value="">Select Difficulty</option>
                {difficultyOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>

            <br />

            <button onClick={handleSubmit}>Let's Start</button>
        </div>
    )
}

export default Play;
