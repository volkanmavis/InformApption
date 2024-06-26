import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let user = { email, password };
      let res = await axios.post(`https://informapption.onrender.com/users/login`, user);
      let token = res.data.token;
      localStorage.setItem("token", token);

      const role = res.data.role;
      if (role === 'admin') {
        navigate('/adminpage');
      } else if (role === 'user') {
        navigate('/play');
      } else {
        console.error('Invalid role received:', role);
        navigate('/login');
      }
    } catch (error) {

      if (error.response && error.response.data && error.response.data.msg) {

        alert(error.response.data.msg);
      } else {

        alert('An error occurred. Please try again later.');
      }
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
