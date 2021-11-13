import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import Timeline from './Timeline';
import Odometer from 'react-odometerjs';
import StockDetails from './StockDetails';
import News from './News';


function Newsfeed (props) {

  const [odometerValue, setOdometerValue] = useState(0)

  useEffect(() => {
    setOdometerValue(props.currentStock.price);
  }, [props.currentStock, props.total]);

  const color = props.currentStock.change > 0? "green" : "red";
  const percentage = props.currentStock.percentage? Number(props.currentStock.percentage).toFixed(2): 0
  const price = props.currentStock.change === 'NaN' ? 0: props.currentStock.change

    return(
      <div className='newsfeed'>
          <div className='newsfeed-container'>
            <div className='newsfeed-chartSection'>
              <div className='newsfeed-portfolio'>
                <h2>{ props.buyView? props.currentStock.name: 'Balance' }</h2>
                <h1> $<Odometer
                  format="(,ddd).dd"
                  duration={ 200 }
                  value={odometerValue }
                />
                </h1>
                <p className = {color}>+${price} ({percentage}%) Today</p>
              </div>
              <div >
                <Graph currentStock={props.currentStock}  setFetchStatus={props.setFetchStatus}/>
              </div>
            </div>
          </div>
          {!props.buyView? null : <StockDetails currentStock={props.currentStock}/>}
          <News buyView={props.buyView} currentStock={props.currentStock}/>
      </div>
    )
}

export default Newsfeed;
