import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import '../components/css/navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken) {
      setRole(decodedToken.role);
    }
  }, [token]);

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
            <Link to="/play" className="link">
              Let's Play
            </Link>
            <Link to="/userpage" id="user-page" className="link">
              User Page
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
                Qestions
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
