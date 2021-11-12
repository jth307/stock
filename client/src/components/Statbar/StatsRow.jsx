
import React from "react";
import SmallGraph from './SmallGraph';
import { Link, useHistory, Redirect } from 'react-router-dom';


function StatsRow(props) {

  var history = useHistory()
  const percentage = ((props.price - props.openPrice)/props.openPrice) * 100;

  const viewStock = () => {
    props.changeStock(props.name, props.price, percentage, Number(props.price - props.openPrice).toFixed(2), props.volume)
    }

  const share = props.volume === 1? ' share': " shares"

  return (
    <div className="row" id={props.name} onClick={viewStock}>
      <div className="row-intro">
        <h1>{props.name}</h1>
        <p>{props.volume &&
          (props.volume + share)}
        </p>
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
