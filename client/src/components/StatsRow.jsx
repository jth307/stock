
import React from "react";
import StockChart from '../stock.svg'
import SmallGraph from './SmallGraph';


function StatsRow(props) {

  const percentage = ((props.price - props.openPrice)/props.openPrice) * 100;


  return (
    <div className="row" >
      <div className="row-intro">
        <h1>{props?.name}</h1>
        <p>{props.volume &&
          (props.volume + " shares")
        }</p>
      </div>
      <div className="row-chart">
        <SmallGraph stock = {props.name}/>
       </div>
      <div className="row-numbers">
        <p className="row-price">${props.price}</p>
        <p className="row-percentage"> {Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );

}

export default StatsRow;
