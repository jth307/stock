import React, { useState, useEffect } from 'react';

import Header from './Main/Header';
import Newsfeed from './Main/Newsfeed';
import Stats from './Statbar/Stats';
import Buy from './Buy';



function Portfolio () {

  const [currentStock, setCurrentStock] = useState({
    name: 'PFE',
    price: 128573.98,
    percentage: .56,
    change: 44.25
  })
  const [buyView, setBuyView] = useState(false)

  const changeStock = (stock,price,percentage,change)=>{
    setCurrentStock({name: stock, price: price, percentage: percentage, change: change});
    setBuyView(true);
  }

  const reset = ()=>{
    setCurrentStock({
      name:'PFE',
      price:128573.98,
      percentage: .56,
      change: 44.25
    });
    setBuyView(false);
  }


  return (

    <div>

      <div >
        <Header reset={reset} changeStock= {changeStock}/>
      </div>
      <div className= 'portfolio-main-div'>
      <div className= 'portfolio-info-div'>
        <Newsfeed currentStock= {currentStock} buyView={buyView}/>
        {buyView? <Buy currentStock= {currentStock}/> :
        <Stats changeStock= {changeStock}/>}
      </div>
      </div>

    </div>
  )
};

export default Portfolio;

