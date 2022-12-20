// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
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
import Welcome from './components/Welcome/Welcome';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a Private Route');
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login" />
  }} />
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
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route
              path="/login"
              render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />}
            />
            <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
            <Route exact path="/" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/routine" component={Dnd} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
