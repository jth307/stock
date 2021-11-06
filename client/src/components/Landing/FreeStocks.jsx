
import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const FreeStocks = (props) => {
  return (
    <main>
      <Nav />
      <div className="splashy-container">
        <div className="buffer" />
        <section className="splashy-section-1">
          <div className="section-1-text">
            <header>Invest Your Way</header>
            <div className="subtext">
              At Robinwood, we work to give you the tools you need to build your future.
            </div>
            <Link
              id="splash-signup-link"
              className="nav-child"
              to="/signup"><span>Sign Up</span></Link>
            <div className="filler" />
          </div>
          <div className="section-1-image" />
        </section>
      </div>
    </main>
  );
}

export default FreeStocks;