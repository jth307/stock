import React, { useState, useEffect } from 'react';

import Header from './Main/Header';
import Newsfeed from './Main/Newsfeed';
import Stats from './Statbar/Stats';
import Buy from './Buy';



function Portfolio () {

  const [currentStock, setCurrentStock] = useState('PFE')
  const [buyView, setBuyView] = useState(false)

  const changeStock = (stock)=>{
    setCurrentStock(stock);
    setBuyView(true);
    console.log('bv',buyView)
  }

  const reset = ()=>{
    setCurrentStock('PFE');
    setBuyView(false);
  }


  return (

    <div>

      <div >
        <Header reset={reset}/>
      </div>
      <div className= 'portfolio-main-div'>
      <div className= 'portfolio-info-div'>
        <Newsfeed currentStock= {currentStock}/>
        {buyView? <Buy currentStock= {currentStock}/> :
        <Stats changeStock= {changeStock}/>}
      </div>
      </div>

    </div>
  )
};

export default Portfolio;

