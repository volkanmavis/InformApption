import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import PrivateRoutes from './pages/PrivateRoutes';
import Navbar from './components/Navbar';


function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<UserPage/>} path="/userpage" exact/>
        <Route element={<AdminPage/>} path="/adminpage"/>
      </Routes>
    </Router>
  );
}

export default App;
