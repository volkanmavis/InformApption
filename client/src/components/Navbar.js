import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import '../components/css/navbar.css'
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [role, setRole] = useState(null);
  const [userScores, setUserScores] = useState(null);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken) {
      setRole(decodedToken.role);
      if (decodedToken.role === "user") {
        fetchUserScores(userId);
      }
    }
  }, [token, userId]);

  const fetchUserScores = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/users/score/${userId}`);

      setUserScores(response.data.data.scores);
      
    } catch (error) {
      console.error("Error fetching user scores:", error);
    }
  };

  const getHighestScore = (userScores) => {
    if (!userScores || userScores.length === 0) {
      return null;
    }
  
    const highestScores = {
      easy: Math.max(...userScores.easy),
      medium: Math.max(...userScores.medium),
      hard: Math.max(...userScores.hard)
    };
  
    return highestScores;
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  return (
    token && (
      <div className="navbar">
        <h1>InformApption</h1>
        <div className="links1">
          {role === "user" && (
            <div>
              <Link id="best-score" className="link">
              </Link>
              <Link id="lets-play" to="/play" className="link">
                Let's Play
              </Link>
              <Link to="/howtoplay" id="how-to-play" className="link">
                How to Play?
              </Link>
            </div>
          )}
          {role === "admin" && (
            <div>
              <Link to="/adminpage" className="link">
                Admin Dashboard
              </Link>
              <Link to="/allquestions" id="questions" className="link">
                Questions
              </Link>
              <Link to="/quizzes" id="quizzes" className="link">
                Quizzes
              </Link>
              <Link to="/newquestion" id="new-question" className="link">
                New Question
              </Link>
              <Link to="/allusers" id="all-users" className="link">
                Users
              </Link>
            </div>
          )}
          <Link to="/leaderboard" className="link">
            Leader Board
          </Link>
          <Link onClick={handleLogout} to="/" className="link">
            Logout
          </Link>
        </div>
      </div>
    )
  );
};

export default Navbar;
