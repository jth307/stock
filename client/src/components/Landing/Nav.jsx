import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SVGIcon from '../../../dist/svg.js';

function Nav ({authed}) {

    return(
      <div className="greeting-div">
      <div className="greeting-left">
        <Link className="rh-logo" to="/landing2">
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



