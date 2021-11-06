

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Timeline from './Timeline';


function Graph({currentStock}) {

  const [graphXData, setGraphXData] = useState([])
  const [graphYData, setGraphYData] = useState([])
  const [graphColor, setGraphColor] = useState('#21CE99')
  const [graphInterval, setGraphInterval] = useState('24H')
  const config = require('../../../../server/helpers/config.js');


  const BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
  const TOKEN = config.API_TOKEN

  const changeInterval = (interval) => {
    setGraphInterval(interval.interval)
  };


  const getStockGraphData = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}/intraday-prices/?chartInterval=${graphInterval.substring(0,1)}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  const data = {
    labels: graphXData,
    datasets: [
      {
        label: 'average',
        data: graphYData,
        fill: false,
        type: 'line',
        backgroundColor: graphColor,
        borderColor: graphColor,
        borderWidth: 1.8,
        pointRadius: 0,
        pointBorderColor: graphColor,
        pointBackgroundColor: graphColor,
        pointHoverBackgroundColor: graphColor,
        pointHoverBorderColor: graphColor,
        pointHoverBorderWidth: 1,
        pointHoverRadius:4
      },
    ],
  };

  const options= {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'white',
      bodyColor: graphColor,
      displayColors: false,
      titleFont: {size: 0},
      padding: 15,
      borderColor	: 'lightgrey',
      borderWidth: 1,
      cornerRadius: 0,
      caretPadding: 55,
      bodyFont: {
        family:'Dosis',
        size: 16,
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    }
  }


  useEffect(() => {

    let dataX = [];
    let dataY = [];

    getStockGraphData(currentStock.name)
      .then((res) => {

        for (let i = 0; i < res.data.length; i++) {
          dataX.push(res.data[i].minute);
          dataY.push(res.data[i].average)
        }
        setGraphXData(dataX);
        setGraphYData(dataY);

        if (dataY[dataY.length-1] - dataY[0] < 0) {
          setGraphColor('red')} else {
            setGraphColor('#21CE99')
          }
      })
  }, [currentStock, graphInterval]);



  return (
    <div className='newsfeed-chart'>
    <div className='graph'>
           <Line data={data} options={options} />
          </div>

          <div className="timeline-container">
        <div className="timeline-buttons-container">
          {['LIVE', '24H', '4W', '3M', '1Y', '5Y'].map((interval) =>
           <Timeline interval = {interval} changeInterval = {changeInterval} currentInterval = {graphInterval}/>
           )}
        </div>
    </div>
      </div>

  );
}


export default Graph;
