import React from 'react';
import { Route } from 'react-router-dom';
// import { AuthRoute } from '../util/route_util';

import Header from './Header';
import Newsfeed from './Newsfeed';
import Stats from './Stats';


// import SplashContainer from './splash/splash_container';
// import LoginFormContainer from './session_form/login_form_container';
// import SignupFormContainer from './session_form/signup_form_container';
// import StockDetailsContainer from './stock/stock_details_container';
// import PortfolioContainer from './portfolio/portfolio_container';
// import ModalContainer from './modal/modal_container';

const App = () => (
    <div className='App'>
      <div className= 'app-header'>
        <Header />
      </div>
      <div className= 'app-body'>
      <div className= 'app-body-container'>
        <Newsfeed />
        <Stats />
      </div>
      </div>

    </div>
);

export default App;