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
    console.log(token);
    if (token && jwt.decode(token)) {
        var seconds = 1000;
        var d = new Date();
        var t = d.getTime();

        const expiry = jwt.decode(token).exp;
        if (expiry > Math.round(t / seconds)) {
            return true;
        }
    }
    return false;
};

const App = () => {
    let validUserToken = isExpired(localStorage.getItem('token'));
    const [userLoggedIn, setUserLoggedIn] = useState(validUserToken);
    console.log(validUserToken);

    const login = () => {
        setUserLoggedIn(true);
    };

    const logout = () => {
        setUserLoggedIn(false);
    };
    console.log(userLoggedIn);

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
                        <Login {...props} login={login.bind(this)} />
                    )}
                />
                <Route exact path='/register' component={Register} />

                {userLoggedIn
                    ? [
                          <Route
                              key={'logout'}
                              exact
                              path='/logout'
                              render={props => (
                                  <Logout
                                      {...props}
                                      logout={logout.bind(this)}
                                  />
                              )}
                          />,

                          <Route
                              key={'chart'}
                              exact
                              path='/chart'
                              component={ChartsContainer}
                          />,
                          <Route
                              key={'profile'}
                              exact
                              path='/profile'
                              component={Profile}
                          />
                      ]
                    : null}
            </div>
        </Router>
    );
};
export default App;
