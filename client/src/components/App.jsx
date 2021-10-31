import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Newsfeed from './Newsfeed';
import Stats from './Stats';
import LoginPage from './LoginPage';




function App () {

  const adminUser = {
    email : 'admin@admin.co',
    password: 'admin',
    name: 'Jamie'
  };

  const [user, setUser] = useState({admin: false});
  const [error, setError] = useState('');

  const Login = (details) => {
    console.log(details);
    if (details.email === adminUser.email && details.password === adminUser.password) {
      setUser({admin: true })
    } else {
      setError('Invalid Credentials')
    }
  }

  const Logout = () => {
    console.log('Logged Out!');
    setUser({admin: false})
  }



  return (

    <div className='App'>
      {(!user.admin) ? (
      <>
      <div className= 'app-header'>
        <Header Logout={Logout}/>
      </div>
      <div className= 'app-body'>
      <div className= 'app-body-container'>
        <Newsfeed />
        <Stats />
      </div>
      </div>
      </>) : (
        <LoginPage Login={Login} error={error}/>
      )}
    </div>
  )
};

export default App;

