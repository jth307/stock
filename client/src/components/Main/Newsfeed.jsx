import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import Timeline from './Timeline';
import Odometer from 'react-odometerjs';


function Newsfeed (props) {

  const [odometerValue, setOdometerValue] = useState(0)

  // useEffect(() => {
  //   setOdometerValue(currentStock.price);
  // }, []);

  useEffect(() => {
    setOdometerValue(props.currentStock.price);
  }, [props.currentStock]);

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
                <p>+$44.63 (+0.04%) Today</p>
              </div>
              <div >
                <Graph currentStock={props.currentStock}/>
              </div>
            </div>
          </div>
      </div>

    )

}

export default Newsfeed;
