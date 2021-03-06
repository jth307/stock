
import React from 'react';
import Header from '../Main/Header';
import { Link } from 'react-router-dom';

const FreeStocks = (props) => {
  return (
    <main>
      <Header />
      <div className="city-container">
        <div className="buffer" />
        <section className="city-section-1">
          <div className="city-section-1-text">
            <header>Invest Your Way</header>
            <div className="subtext">
              At Robinwood, we work to give you the tools you need to build your future.
            </div>
            <Link
              id="city-signup-link"
              className="nav-child"
              to="/signup">
              <span>Sign Up</span>
            </Link>
            <div className="filler" />
          </div>
          <div className="city-section-1-image" />
        </section>
      </div>
    </main>
  );
}

export default FreeStocks;