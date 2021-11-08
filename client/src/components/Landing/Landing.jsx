
import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <>
    <div>
      <Nav />
    </div>
    <main className="panes">
      <section className="pane1">
        <section className="pane1-text">
          <header>
            <h1 className="animated fadeInUp">Investing.</h1>
            <h1 className="animated fadeInUp delay-1s">Now for the rest of us.</h1>
          </header>
          <div>
            <p className="animated fadeInUp delay-2s">Robinwood lets you learn to invest in the </p>
            <p className="animated fadeInUp delay-2s"> stock market for free.</p>
          </div>
          <Link
              className="signup-buttonz animated fadeInUp delay-3s"
              to={{
                pathname: '/login',
                state: { demoUser: true }
              }}>
                 <span>Demo</span>
          </Link>
        </section>
        <div className="animated fadeInUp delay-3s video-container">
          <video autoPlay loop muted>
            <source src="http://sparrow-app.herokuapp.com/assets/phone_1-aa43dfecfbf3cfffd8613a65f01fa3eae946475a23e4cbf039f70b2b11ffafae.webm" />
          </video>
        </div>
      </section>
    </main>
    </>
  );
};

export default Landing;

