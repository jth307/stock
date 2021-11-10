

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import apiRoutes from '../../apiRoutes.js';


function SmallGraph({stock}) {

  const [graphXData, setGraphXData] = useState([])
  const [graphYData, setGraphYData] = useState([])
  const [graphColor, setGraphColor] = useState('#21CE99')


  const graphData = {
    labels: graphXData,
    datasets: [
      {
        label: 'average',
        data: graphYData,
        fill: false,
        type: 'line',
        backgroundColor: graphColor,
        borderColor: graphColor,
        borderWidth: 1.4,
        pointRadius: 0,
        pointHoverRadius: 3
      },
    ],
  };

  const graphOptions= {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'transparent',
      bodyColor: graphColor,
      titleFont: {size: 0},
      displayColors: false,
      caretPadding: 95,
      bodyFont: {
        family:'Dosis',
        size: 10,
      }
    },
    scales: {
      x: {
        display: false,
        time: {
          format: 'MM/DD/YY',
          tooltipFormat:'ll'
        },
      },
      y: {
        display: false,
        title: {
          display: false,
        }
      }
    }
  }

  useEffect(() => {

    let dataX = [];
    let dataY = [];

        apiRoutes.getStockGraphData(stock,'2')
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            dataX.push(res.data[i].minute);
            dataY.push(res.data[i].average)
          }
          setGraphXData(dataX);
          setGraphYData(dataY);

          if (dataY[dataY.length-1] - dataY[0] < 0) {
            setGraphColor('red')}
        })
  }, []);


  return (
    <div className='graph'>
           <Line
            data={graphData}
            options={graphOptions}
            width={72}
            height={40}
           />
          </div>
  );
}


export default SmallGraph;
