import React, { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import Header from './Main/Header';
import Newsfeed from './Main/Newsfeed';
import Stats from './Statbar/Stats';
import Buy from './Statbar/Buy';
import { BeatLoader } from 'react-spinners';


function Portfolio () {
  const location = useLocation();
  const [snapshot, setSnapshot] = useState({total:0,priceChange:0,changePercentage:0});
  const [buyView, setBuyView] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [user, setUser] = useState({username: location.state.username, userID: location.state.userID});
  const [currentStock, setCurrentStock] = useState({
    name: 'PFE',
    price: snapshot.total,
    percentage: snapshot.changePercentage,
    change: Number(snapshot.priceChange).toFixed(2),
    quantity: 10
  });


  const changeStock = (stock,price,percentage,change,volume)=>{
    setCurrentStock({name: stock, price: price, percentage: percentage, change: change, quantity: volume});
    setBuyView(true);
  }

  const reset = ()=>{
    setCurrentStock({
      name:'PFE',
      price: snapshot.total,
      percentage: snapshot.changePercentage,
      change: Number(snapshot.priceChange).toFixed(2),
      quantity: 10
    });
    setBuyView(false);
  }

  useEffect(() => {
    reset()
  }, [snapshot]);

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
        <Header user={user.username} reset={reset} changeStock= {changeStock}/>
      </div>
      <div className= 'portfolio-main-div'>
        <div className= 'portfolio-info-div'>
          <Newsfeed total = {snapshot.total} currentStock= {currentStock} buyView={buyView} setFetchStatus= {setFetchStatus}/>
          {buyView? <Buy user={user} currentStock= {currentStock}/> :
          <Stats
          setSnapshot = {setSnapshot}
          changeStock= {changeStock}
          setFetchStatus= {setFetchStatus}
          user={user}/>}
        </div>
      </div>
    </div>
  )
};

export default Portfolio;

