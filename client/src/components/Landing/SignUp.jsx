import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import Nav from './Nav';
import apiRoutes from '../../apiRoutes.js';


function SignUp (){

    const [error, setError] = useState([]);

    let history = useHistory();

    const signUp = (e) =>{
      e.preventDefault();
      let data = {
       firstname: document.getElementById('firstname').value,
       lastname: document.getElementById('lastname').value,
       email: document.getElementById('email').value,
       password :document.getElementById('password').value,
       username: document.getElementById('username').value
      }

      apiRoutes.createUser(data)
      .then((res) => {
        if (res.data.errors) {
            setError(res.data.errors);
        } else {
            setError([])
            history.push({
                    pathname: '/login',
                    state: {
                    demoUser: false,
                    password: data.password,
                    username: data.username,
                    userID: res.data[0].id
                    }
                })
            }})
      .catch((error)=> {
          console.log('signup error',error);
      })
    }

    const renderErrors=() => {
        if (error.length>0) {
            return (
                <ul className='signup-errors'>
                    {error.map((err, i) => (
                        <li key={`error-${i}`}>
                            {err.message}
                        </li>
                    ))}
                </ul>
            );
        }
    }

    useEffect(() => {
        setError([]);
    }, [])

    return (
        <>
        <div> <Nav/> </div>
        <div className='signup-form-div'>
            <form >
                <h1 className='form-h1'>Make Your Money Move</h1>
                <h2 className='form-h2'>Robinwood lets you invest in companies you love, commission-free</h2>
                <div className='signup-inputs-div'>
                    <div className='name'>
                        <input
                            type="text"
                            placeholder="First name"
                            id="firstname"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            id="lastname"
                            required
                        />
                    </div>
                    <input
                        className='signup-input'
                        type="email"
                        placeholder="Email address"
                        id="email"
                        required
                    />
                    <input
                        className='signup-input'
                        type="text"
                        placeholder="Username"
                        id="username"
                        required
                    />
                    <input
                        className='signup-input'
                        type="password"
                        placeholder="Password [min. 6 characters]"
                        id="password"
                        required
                    />
                    <button className='signup-form-button' type="submit" onClick={signUp}>Sign Up</button>
                    <p className='session-link-p'>
                        Already started? <Link className='session-nav-link' to={`/login`}>
                                            {LoginForm} Login to your account
                                        </Link>
                    </p>
                </div>
                {renderErrors()}
            </form>
        </div>
        </>
    )

}

export default SignUp;