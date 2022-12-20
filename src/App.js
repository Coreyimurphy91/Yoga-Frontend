// Imports
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, Outlet, useLocation, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

// CSS
import './App.css';

// Components
import Signup from './components/Log/Signup';
import About from './components/About/About';
import Dnd from './components/Dnd';
import Footer from './components/Nav/Footer';
import Login from './components/Log/Login';
import Navbar from './components/Nav/Navbar';
import Profile from './components/Profile';
import RoutineList from './components/RoutineList';
import Welcome from './components/Welcome/Welcome';

const PrivateRoute = ({ element: element, ...rest }) => {
  const { pathname } = useLocation();

  const [isValidToken, setIsValidToken] = useState(); // <-- initially undefined
  let token = localStorage.getItem('jwtToken');
  useEffect(() => {
    // initial mount or route changed, check token
    setIsValidToken(!!token);
  }, [pathname]);

  if (isValidToken === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return isValidToken ? <Outlet /> : <Navigate to="/login" />
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
      
    }
  }

  return (
    // <div>
    // <Dnd/>
    // </div>
    // <Dnd routineId='63a04e5845234d15ba893edf'/>
    <Router>
      <div className="App">
        <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
        <div className="container mt-5">
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route
              path="/login"
              element={<Login nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />}
            />
            <Route exact path='/profile' element={<PrivateRoute />}>
              <Route exact path='/profile' element={<Profile user={currentUser} handleLogout={handleLogout} />} />
            </Route>
            <Route exact path="/" element={<Welcome />} />
            <Route path="/about" element={<About />} />
            <Route exact path='/routine' element={<PrivateRoute />}>
              <Route path="/routine" element={<RoutineList />} />
            </Route>
            <Route path='/routine/:id' element={<PrivateRoute />}>
              <Route path="/routine/:id" element={<Dnd />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
