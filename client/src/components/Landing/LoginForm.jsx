import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Nav from './Nav';


function LoginForm(props) {

  var history = useHistory()
  const location = useLocation();

  const [details, setDetails] = useState({email:'', password:''});
  const [error, setError] = useState('');

  const adminUser = {
    email : 'guest@demo',
    password: 'password123',
    name: 'Jamie'
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details)
  }

  const Login = (details) => {
    if (details.email === adminUser.email && details.password === adminUser.password) {
      history.push('/portfolio')
    } else {
      setError('Invalid Credentials')
    }
  }

    useEffect(() => {
      if (location.state)
        {displayDemoUser('guest@demo', 0)};
    }, [])


    const displayDemoUser = (username, n) =>{
        if (n < username.length) {
            let curr = username.substring(0, n + 1);
            setDetails({ email: curr });
            n++;
            setTimeout( () => { displayDemoUser(username, n) }, 100);
        } else {
            displayDemoPassword('password123', 0);
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
                        type='email' name='name' id='name' onChange={e => setDetails({...details, email: e.target.value})} value = {details.email}
                        value={details.email}
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