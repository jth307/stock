import React, { useState, useEffect } from 'react';

import Header from './Header';
import Newsfeed from './Newsfeed';
import Stats from './Stats';


function Portfolio () {

  return (

    <div>

      <div >
        <Header />
      </div>
      <div className= 'portfolio-main-div'>
      <div className= 'portfolio-info-div'>
        <Newsfeed />
        <Stats />
      </div>
      </div>

    </div>
  )
};

export default Portfolio;

