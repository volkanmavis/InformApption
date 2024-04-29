
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage';
import UserPage from'./pages/UserPage';
import Login from './components/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route element={<Login/>} path="/login"/>
            <Route element={<PrivateRoutes />}>
                <Route element={<UserPage/>} path="/userpage" exact/>
                <Route element={<AdminPage/>} path="/adminpage"/>
            </Route>
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
