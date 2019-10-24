import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Register from './components/Register';
import ChartsContainer from './components/stocktrading/ChartsContainer.js';

import './App.css';

const jwt = require('jsonwebtoken');

const isExpired = token => {
    if (token && jwt.decode(token)) {
        const expiry = jwt.decode(token).exp;
        if (Date.now() >= expiry * 1000) {
            return false;
        }
    }
    return true;
};

const App = () => {
    let validUserToken = isExpired(localStorage.getItem('token'));
    const [userLoggedIn, setUserLoggedIn] = useState(validUserToken);

    const login = () => {
        setUserLoggedIn(true);
    };

    const logout = () => {
        setUserLoggedIn(false);
    };

    return (
        <Router>
            <div className='App'>
                <NavBar userLoggedIn={userLoggedIn} />
                <Route exact path='/'>
                    {userLoggedIn ? (
                        <Redirect to='/logout' />
                    ) : (
                        <Redirect to='/login' />
                    )}
                </Route>

                <Route exact path='/login'>
                    {userLoggedIn ? (
                        <Redirect to='/logout' />
                    ) : (
                        <Redirect to='/login' />
                    )}
                </Route>
                <Route
                    exact
                    path='/login'
                    render={props => (
                        <Login
                            {...props}
                            login={login.bind(this)}
                            logout={logout.bind(this)}
                        />
                    )}
                />
                <Route exact path='/register' component={Register} />

                {userLoggedIn
                    ? [
                          <Route
                              exact
                              path='/logout'
                              render={props => (
                                  <Logout
                                      {...props}
                                      login={login.bind(this)}
                                      logout={logout.bind(this)}
                                  />
                              )}
                          />,

                          <Route
                              exact
                              path='/chart'
                              component={ChartsContainer}
                          />,
                          <Route exact path='/profile' component={Profile} />
                      ]
                    : null}
            </div>
        </Router>
    );
};
export default App;
