import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Allows us to link to different routes
import { jwtDecode } from "jwt-decode"; // Allows us to decode the token


const Navbar = () => {
  let navigate = useNavigate();
  let token;
  let decoded;
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
    decoded = jwtDecode(token);
  }
  function handleLogout() {
    if (localStorage.getItem("token")) {
      if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token");
        console.log("Logout successfully");
        navigate("/login");
      }
    }
  }

  return (
    <div className="navbar">
      <h1>InformApption</h1>
      {token ? (
        <div className="links1">
          <Link to="/" className="link">
            Home
          </Link>
          {/* Conditional rendering based on user role */}
          {decoded && decoded.role === "user" && (
            <Link to="/user-page" className="link">
              User Page
            </Link>
          )}
          {decoded && decoded.role === "admin" && (
            <Link to="/admin-page" className="link">
              Admin Page
            </Link>
          )}
          <Link onClick={handleLogout} to="/" className="link">
            Logout
          </Link>
        </div>
      ) : (
        <div className="links2">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/register" className="link">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar