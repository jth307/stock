import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SVGIcon from '../../../dist/images/svg.js';
import Searchbar from './Searchbar';


function Header (props) {

  let history = useHistory()

  const Logout = () =>{
    history.push('/' )
  }

  return(
    <div className='greeting-div'>
      <div className="greeting-left">
        <Link className="rh-logo" to="/about">
          <SVGIcon name="icon" width={40} height={40} />
          <span> Robinwood </span>
        </Link>
      </div>
      <Searchbar changeStock= {props.changeStock}/>
      <div className='header-menuItems'>
        <div onClick={() => (history.push('/free'))}>Free Stocks</div>
        <div onClick={()=>(props.reset())}>Portfolio</div>
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
