import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import Timeline from './Timeline';
import Odometer from 'react-odometerjs';
import About from './About';



function Newsfeed (props) {

  const [odometerValue, setOdometerValue] = useState(0)

  // useEffect(() => {
  //   setOdometerValue(currentStock.price);
  // }, []);

  useEffect(() => {
    setOdometerValue(props.currentStock.price);
  }, [props.currentStock]);

  const color = props.currentStock.change > 0? "green" : "red";

    return(
      <div className='newsfeed'>
          <div className='newsfeed-container'>
            <div className='newsfeed-chartSection'>
              <div className='newsfeed-portfolio'>
                <h2>{ props.buyView?props.currentStock.name: 'Balance' }</h2>
                <h1> $<Odometer
                format="(,ddd).dd"
                duration={ 200 }
                value={odometerValue }
            />
            </h1>
                <p className = {color}>+${props.currentStock.change} ({Number(props.currentStock.percentage).toFixed(2)}%) Today</p>
              </div>
              <div >
                <Graph currentStock={props.currentStock}/>
              </div>
            </div>
          </div>
          {odometerValue > 100000? null : <About currentStock= {props.currentStock}/>}

      </div>

    )

}

export default Newsfeed;
