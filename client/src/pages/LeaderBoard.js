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
      const response = await axios.get(`https://informapption.onrender.com/users/allusers`);
      const allUsers = response.data.data;

      const topScores = {
        easy: [],
        medium: [],
        hard: []
      };

      allUsers.forEach(user => {
        Object.keys(user.scores).forEach(difficulty => {
          const scoresArray = user.scores[difficulty];
          if (Array.isArray(scoresArray)) { // Check if scoresArray is an array
            scoresArray.forEach(score => {
              topScores[difficulty].push({ email: user.email, score });
            });
          } else {
            console.error(`Scores for ${difficulty} difficulty level are not in the expected array format.`);
          }
        });
      });

      // Sort top scores arrays by score in descending order
      Object.keys(topScores).forEach(difficulty => {
        topScores[difficulty].sort((a, b) => b.score - a.score);
        // Get top 5 scores for each difficulty
        topScores[difficulty] = topScores[difficulty].slice(0, 5);
      });

      setLeaderboardData(topScores);
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
    <div className='all-boards'>
      {renderLeaderboard('easy')}
      {renderLeaderboard('medium')}
      {renderLeaderboard('hard')}
    </div>
  );
}

export default LeaderBoard;
