import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SVGIcon from '../../../dist/images/svg.js';

function Nav (props) {

  let history = useHistory()

  const handleDemo = () =>{
    if (props.setDemo){
    props.setDemo(true,0)
    } else{
      history.push({
        pathname: '/login',
        state: { demoUser: true }
      })
      }
    }

  return(
    <div className="greeting-div">
      <div className="greeting-left">
        <Link className="rh-logo" to="/about">
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
          <Link className="login-button" to="/login" replace>
            Log In
          </Link>
        </div>
        <div>
          <button className="demo-button" onClick={handleDemo}>
            Demo
          </button>
        </div>
      </div>
    </div>
  )
  }



export default Nav;



