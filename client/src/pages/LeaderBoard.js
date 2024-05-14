import React, { useState, useEffect } from 'react';
import '../pages/css/leaderBoard.css';
import axios from 'axios';

function LeaderBoard() {
  const [leaderboardData, setLeaderboardData] = useState({
    easy: [],
    medium: [],
    hard: []
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/allusers");
      const allUsers = response.data.data;
      const userDataArray = [];

      // Iterate through each user and push their data into the array
      allUsers.forEach(user => {
        const { email, scores } = user;
        // For each user, push their email and scores for each difficulty category
        Object.keys(scores).forEach(difficulty => {
          userDataArray.push({ email, difficulty, score: scores[difficulty] });
        });
      });

      // Sort the userDataArray based on score for each difficulty
      userDataArray.sort((a, b) => b.score - a.score);

      // Populate leaderboardData
      const updatedLeaderboardData = {
        easy: userDataArray.filter(user => user.difficulty === 'easy'),
        medium: userDataArray.filter(user => user.difficulty === 'medium'),
        hard: userDataArray.filter(user => user.difficulty === 'hard')
      };

      setLeaderboardData(updatedLeaderboardData);
      console.log(updatedLeaderboardData)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const renderLeaderboard = (difficulty) => {
    return (
      <div className='list-container'>
        <strong>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Leaderboard</strong>
        <ol className="alternating-colors">
          {leaderboardData[difficulty].map((user, index) => (
            <li key={index}>
              <strong>{user.email}</strong>
              <p>Score: {user.score}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      {renderLeaderboard('easy')}
      {renderLeaderboard('medium')}
      {renderLeaderboard('hard')}
    </div>
  );
}

export default LeaderBoard;
