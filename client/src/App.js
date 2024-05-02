
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage';
import UserPage from'./pages/UserPage';
import Login from './components/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import Navbar from './components/Navbar'
import Register from './components/Register'
import QuestionForm from './pages/QuestionForm';
import AllUsers from './pages/AllUsers';
import Quizzes from './pages/Quizzes';
import LeaderBoard from './pages/LeaderBoard';
import Play from './pages/Play';
import HowToPlay from './pages/HowToPlay';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route element={<Login/>} path="/"/>
            <Route element={<Register/>} path="/register"/>
            <Route element={<PrivateRoutes />}>
                <Route element={<UserPage/>} path="/userpage" exact/>
                <Route element={<AdminPage/>} path="/adminpage"/>
                <Route element={<Quizzes/>} path="/quizzes"/>
                <Route element={<QuestionForm/>} path="/newquestion"/>
                <Route element={<AllUsers/>} path="/allusers"/>
                <Route element={<LeaderBoard/>} path="/leaderboard"/>
                <Route element={<Play/>} path="/play"/>
                <Route element={<HowToPlay/>} path="/howtoplay"/>

            </Route>
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
