import React, { useState, useEffect } from 'react';

import Header from './Main/Header';
import Newsfeed from './Main/Newsfeed';
import Stats from './Statbar/Stats';


function Portfolio () {

  const [currentStock, setCurrentStock] = useState('PFE')

  const changeStock = (stock)=>{
    setCurrentStock(stock)
  }


  return (

    <div>

      <div >
        <Header />
      </div>
      <div className= 'portfolio-main-div'>
      <div className= 'portfolio-info-div'>
        <Newsfeed currentStock= {currentStock}/>
        <Stats changeStock= {changeStock}/>
      </div>
      </div>

    </div>
  )
};

export default Portfolio;

