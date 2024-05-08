import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/css/login.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let user = { email, password };
      let res = await axios.post("http://localhost:8000/users/login", user);
      let token = res.data.token;
      localStorage.setItem("token", token);
      
      // Redirect based on role
      const role = res.data.role;
      if (role === 'admin') {
        navigate('/adminpage');
      } else if (role === 'user') {
        navigate('/userpage');
      } else {
        console.error('Invalid role received:', role);
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
      // Handle login errors here, e.g., display an error message to the user
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <title>Login</title>
        <input
          placeholder='Email'
          type="text"
          name="email"
          id="email-login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder='Password'
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> 
        <button id="submit-button" align="center" onClick={handleLogin}>Login</button>
        <div>
          <p onClick={handleRegisterClick} align="center" id='not-registered'>Not registered yet?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
