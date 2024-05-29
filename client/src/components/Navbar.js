import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import '../components/css/navbar.css';
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [role, setRole] = useState(null);
  const [userScores, setUserScores] = useState(null);
  const [userAttempt, setUserAttempt] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    if (decodedToken) {
      setRole(decodedToken.role);
      if (decodedToken.role === "user") {
        fetchUserScores(userId);
        fetchUserAttempt(userId);
      }
    }
  }, [token, userId, decodedToken]);

  const fetchUserScores = async (userId) => {
    try {
      const response = await axios.get(`https://informapption.onrender.com/users/score/${userId}`);
      setUserScores(response.data.data.scores);
    } catch (error) {
      console.error("Error fetching user scores:", error);
    }
  };

  const fetchUserAttempt = async (userId) => {
    try {
      const response = await axios.get(`https://informapption.onrender.com/users/score/${userId}`);
      setUserAttempt(response.data.data.failedAttempts.count);
    } catch (error) {
      console.error("Error fetching user attempts:", error);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    token && (
      <div className="navbar">
        <h1 className="logo">InformApption</h1>
        <div className="menu-button" onClick={toggleMenu}>
          &#9776;
        </div>
        <div className={`links1 ${isMenuOpen ? 'active' : ''}`}>
          {role === "user" && (
            <div onClick={closeMenu}>
              <span className="attempt-left">Attempts Left: {3 - userAttempt}</span>
              <Link id="lets-play" to="/play" className="link">Let's Play</Link>
              <Link to="/howtoplay" id="how-to-play" className="link">How to Play?</Link>
              <Link to="/userpage" id="user-page" className="link">My Page</Link>
            </div>
          )}
          {role === "admin" && (
            <div onClick={closeMenu}>
              <Link to="/adminpage" className="link">Admin Dashboard</Link>
              <Link to="/allquestions" id="questions" className="link">Questions</Link>
              <Link to="/newquestion" id="new-question" className="link">New Question</Link>
              <Link to="/allusers" id="all-users" className="link">Users</Link>
            </div>
          )}
          <div className="dropdown-buttom" onClick={closeMenu}>
            <Link to="/leaderboard" className="link">Leader Board</Link>
            <Link id="logout" onClick={handleLogout} to="/" className="link">Logout</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
