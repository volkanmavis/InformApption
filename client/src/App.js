
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
import HowToPlay from './pages/HowToPlay';
import Footer from './components/Footer';
import SavedQuestions from './pages/SavedQuestions';
import Play from './pages/Play';


function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <div className='app-body'>
          <Routes>
            <Route element={<Login/>} path="/"/>
            <Route element={<Register/>} path="/register"/>
            <Route element={<PrivateRoutes />}>
                <Route element={<UserPage/>} path="/userpage"/>
                <Route element={<AdminPage/>} path="/adminpage"/>
                <Route element={<Quizzes/>} path="/quizzes"/>
                <Route element={<QuestionForm/>} path="/newquestion"/>
                <Route element={<AllUsers/>} path="/allusers"/>
                <Route element={<LeaderBoard/>} path="/leaderboard"/>
                <Route element={<Play/>} path="/play"/>
                <Route element={<HowToPlay/>} path="/howtoplay"/>
                <Route element={<SavedQuestions/>} path="/allquestions"/>
            </Route>
          </Routes>
          </div>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;
