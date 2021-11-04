import React, { useState, useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom';
import SVGIcon from '../../../dist/svg.js';

function Nav ({authed}) {
  let history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false)


  const Logout = () =>{
    console.log('Logged Out!');
    history.push('/landing' )
  }

    return(
      <div className="greeting-div">
      <div className="greeting-left">
        <Link className="rh-logo" to="/">
          <SVGIcon name="icon" width={40} height={40} />
          <span> Robinwood </span>
        </Link>
      </div>
      <div className="signup-login-buttons">
        <div>
          <Link className="signup-button" to="/signup">
            Sign Up
          </Link>
        </div>
        <div>
          <Link className="login-button" to="/login">
            Log In
          </Link>
        </div>
        <div>
        <Link className='demo-link' to="/portfolio">
          <button className="demo-button" >
            Demo
          </button>
          </Link>

        </div>
      </div>
    </div>
    )
  }



export default Nav;



