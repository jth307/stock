
import React from "react";
import StockChart from '../stock.svg'

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
        <img src={StockChart} className='pic'/>
       </div>
      <div className="row-numbers">
        <p className="row-price">{props.price}$200</p>
        <p className="row-percentage"> {Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );

}

export default StatsRow;
