
import React from "react";
import StockChart from 'react-svg-loader!../stock.svg'



function StatsRow(props) {


  const percentage = ((props.price - props.openPrice)/props.openPrice) * 100;

  const getModal = () => {

  }
  return (
    <div className="row" >
      <div className="row-intro">
        <h1>{props?.name}</h1>
        <p>200 shares{props.volume &&
          (props.volume + " shares")
        }</p>
      </div>
      <div className="row-chart">
        <StockChart height={16}/>
      </div>
      <div className="row-numbers">
        <p className="row-price">{props.price}$200</p>
        <p className="row-percentage"> {Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );

}

export default StatsRow;
