import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Nav from './Nav';
import auth from '../../auth';
import apiRoutes from '../../apiRoutes.js';


function LoginForm(props) {

    const history = useHistory();
    const location = useLocation();

    const [details, setDetails] = useState({username:'', password:''});
    const [error, setError] = useState('');


    const submitHandler = (e) => {
      if (e) {
        e.preventDefault();
      }

      apiRoutes.authenticateUser(details)
      .then((res) => {
        if (res.data.message === 'Success') {
          auth.login(() => {
            history.push({
              pathname: '/portfolio',
              state: {
              username: details.username,
              userID: res.data.userID
              }
            })
          })
        } else {
          setError(res.data);
        }
      })
      .catch((error)=> {
          console.log('login error',error);
      })
    }


    const Login = () => {
      let currentUser = {}
        currentUser.username = 'robinwood';
        currentUser.password = 'password',
        currentUser.userID = 16
        if (location.state) {
          if (location.state.username) {
            currentUser.username = location.state.username;
            currentUser.password = location.state.password;
          }
        }
      apiRoutes.authenticateUser(currentUser)
      .then((res) => {
        if (res.data.message === 'Success') {

          auth.login(() => {
            history.push({
              pathname: '/portfolio',
              state: {
              username: currentUser.username,
              userID:  res.data.userID
              }
            })
          })
        }
      })
      .catch((error)=> {
        console.log('login error',error);
      })
    }

    const displayDemoUser = (username='robinwood', n=0, password='password') =>{
        if (n < username.length) {
            let curr = username.substring(0, n + 1);
            setDetails({ username: curr });
            n++;
            setTimeout( () => { displayDemoUser(username, n) }, 100);
        } else {
            displayDemoPassword(password, 0);
        }
    }

    const displayDemoPassword = (password, n) =>{
      if (n < password.length) {
          let curr = password.substring(0, n + 1);
          setDetails({ password: curr });
          n++;
          setTimeout(() => { displayDemoPassword(password, n) }, 100);
      } else {
          Login();
      }
    }

    useEffect(() => {
      if (location.state) {
        if (location.state.demoUser)
          {displayDemoUser()}
        if (location.state.username) {
          displayDemoUser(location.state.username, 0, location.state.password)
        }
    }}, [])

    return (
      <>
      <div>
        <Nav displayDemoUser = {displayDemoUser}/>
      </div>
        <div className='session-form-div'>
            <form className='transparent-background'
            onSubmit={submitHandler}>
                <h1 className='login-form-h1'>Welcome to Robinwood</h1>
                <div className='session-inputs-div'>
                    <label className='login-label'>Username</label>
                    <input
                        className='session-input'
                        required
                        type='text' name='name' id='name' onChange={e => setDetails({...details, username: e.target.value})} value = {details.username}
                        value={details.username}
                    />
                    <label className='login-label'>Password</label>
                    <input
                        className='session-input'
                        type="password"
                        required
                        type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                        />
                    <p className='session-link-p'>
                        New to Robinwood? <Link className='session-nav-link' to={`/signup`}>
                            Click here to complete your application
                        </Link>
                    </p>
                    <button className='session-button' type="submit">Login</button>
                    {(error !== '') ? ( <div className='login-errors'>{error}</div>) : ''}
                </div>
            </form>
        </div>
      </>
    )
}

export default LoginForm;