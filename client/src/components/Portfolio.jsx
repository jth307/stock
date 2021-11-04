import React, { useState, useEffect } from 'react';

import Header from './Header';
import Newsfeed from './Newsfeed';
import Stats from './Stats';


function Portfolio () {

  return (

    <div className='portfolio-main-div'>

      <div className= 'app-header'>
        <Header />
      </div>
      <div className= 'portfolio-info-div'>
      <div className= 'portfolio-div'>
        <Newsfeed />
        <Stats />
      </div>
      </div>

    </div>
  )
};

export default Portfolio;

