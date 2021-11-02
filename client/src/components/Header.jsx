import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SVGIcon from '../../dist/svg.js';

function Header () {

  let history = useHistory()

  const Logout = () =>{
    console.log('Logged Out!');
    history.push('/landing' )
  }

  return(
    <div className='header-wrapper'>
      <div className='header-logo'>
        <SVGIcon name="icon" width={30} height={30} />
      </div>
      <div className='header-search'>
        <div className='header-search-container'>
          <input placeholder='Search...' type='text'/>
        </div>
      </div>
      <div className='header-menuItems'>
        <a href='#'>Free Stocks</a>
        <a href='#'>Portfolio</a>
        <a href='#'>Cash</a>
        <a href='#'>Messages</a>
        <a href='#'>Account</a>
        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  )
}

export default Header;
