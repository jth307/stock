import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SVGIcon from '../../dist/svg.js';
import Searchbar from './Searchbar';


function Header () {

  let history = useHistory()

  const Logout = () =>{
    console.log('Logged Out!');
    history.push('/landing' )
  }

  return(
    <div className='greeting-div'>
      <div className="greeting-left">
        <Link className="rh-logo" to="/">
          <SVGIcon name="icon" width={40} height={40} />
          <span> Robinwood </span>
        </Link>
      </div>
      <Searchbar/>
      <div className='header-menuItems'>
        <div>Free Stocks</div>
        <div>Portfolio</div>
        <div>Cash</div>
        <div>Messages</div>
        <div>Account</div>
          <button onClick = {Logout} className="demo-button" >
            Log Out
          </button>
          </div>
    </div>
  )
}

export default Header;
