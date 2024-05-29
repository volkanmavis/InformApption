import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/register.css'

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault(); 
    try {
      let user = { userName, email, password };
      let res = await axios.post(`https://informapption.onrender.com/users/register`, user);
      console.log(res.data);

      navigate('/');
    } catch (error) {
      console.log("registration error:", error); 
    }
  }

  return (
    <div className='register-container'>
      <div className='register-form'>
        <input
          placeholder='Username'
          type="text"
          name="username"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          placeholder='E-mail'
          type="text"
          name="email"
          id="email"
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
        <button id='register-button' onClick={register}>Register</button>
      </div>
    </div>
  )
}

export default Register;