import React, { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';


import Header from './Main/Header';
import Newsfeed from './Main/Newsfeed';
import Stats from './Statbar/Stats';
import Buy from './Statbar/Buy';
import { BeatLoader } from 'react-spinners';


function Portfolio () {
  const location = useLocation();
  const [currentStock, setCurrentStock] = useState({
    name: 'PFE',
    price: 128573.98,
    percentage: .56,
    change: 44.25
  })
  const [buyView, setBuyView] = useState(false)
  const [fetchStatus, setFetchStatus] = useState(false)
  const [user, setUser] = useState(location.state.username)


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

  if (fetchStatus) {
    return (
      <>
      <div >
        <Header reset={reset} changeStock= {changeStock}/>
      </div>
      <div className='loading'>
        <BeatLoader
          sizeUnit={"px"}
          size={20}
          color={'#21ce99'}
          loading={true}
        />
      </div>
      </>
    );
  }

  return (
    <div>
      <div >
        <Header reset={reset} changeStock= {changeStock}/>
      </div>
      <div className= 'portfolio-main-div'>
        <div className= 'portfolio-info-div'>
          <Newsfeed currentStock= {currentStock} buyView={buyView} setFetchStatus= {setFetchStatus}/>
          {buyView? <Buy user={user} currentStock= {currentStock}/> :
          <Stats changeStock= {changeStock}  setFetchStatus= {setFetchStatus}/>}
        </div>
      </div>
    </div>
  )
};

export default Portfolio;

