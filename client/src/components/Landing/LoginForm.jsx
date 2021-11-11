import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Nav from './Nav';
import auth from '../../auth';



function LoginForm(props) {

  var history = useHistory()
  const location = useLocation();

  const [details, setDetails] = useState({username:'', password:''});
  const [error, setError] = useState('');

  const adminUser = {
    username : 'robinwood',
    password: 'password123',
    name: 'Jamie'
  };

  const submitHandler = (e) => {
    e.preventDefault();
    auth.login(details,() => {
     history.push('/portfolio');
    });
  }

  // const Login = (details) => {
  //   if (details.username === adminUser.username && details.password === adminUser.password) {
  //     history.push('/portfolio')
  //   } else {
  //     setError('Invalid Credentials')
  //   }
  // }

    useEffect(() => {
      if (location.state) {
      if (location.state.demoUser)
        {displayDemoUser()};
      }
    }, [])


    const displayDemoUser = (username='robinwood', n=0, password='password123') =>{
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
            Login(adminUser);
        }
    }


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
                    <label className='login-label'>Email</label>
                    <input
                        className='session-input'
                        // onChange={this.update('username')}
                        // value={this.state.username}
                        required
                        type='text' name='name' id='name' onChange={e => setDetails({...details, username: e.target.value})} value = {details.username}
                        value={details.username}
                    />
                    <label className='login-label'>Password</label>
                    <input
                        className='session-input'
                        type="password"
                        // onChange={this.update('password')}
                        // value={this.state.password}
                        required
                        type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                        />
                    <p className='session-link-p'>
                        New to Robinwood?
                        <Link className='session-nav-link' to={`/signup`}>
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