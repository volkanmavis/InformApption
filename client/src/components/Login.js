import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  let token;
  let decodedToken;
  const login = async (event) => {
    event.preventDefault();
    try{
      let user = {email, password};
      let res = await axios.post("http://localhost:8000/users/login", user);
      token = res.data.token
      localStorage.setItem("token", token)
      navigate('/')

    }catch(error){

    }
  };

  return (
    <div className='login-container'>
      <input
        placeholder='E-Mail'
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
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;