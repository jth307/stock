

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


function SmallGraph({stock}) {

  const [graphXData, setGraphXData] = useState([])
  const [graphYData, setGraphYData] = useState([])
  const [graphColor, setGraphColor] = useState('#21CE99')


  const BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
  const TOKEN = 'pk_0bb2b9065996478c82fa4583b57d589b'


    const getStockGraphData = (stock) => {
      return axios
        .get(`${BASE_URL}${stock}/intraday-prices/?chartInterval=5&token=${TOKEN}`)
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
        borderWidth: 1.4,
        pointRadius: 0,
        // pointBorderColor: '#21CE99',
        // pointBackgroundColor: '#000',
        // pointHoverBackgroundColor: '#21CE99',
        // pointHoverBorderColor: '#000',
        // pointHoverBorderWidth: 1,
        pointHoverRadius: 3
      },
    ],
  };

  const options= {
    // tooltips: {
    //   mode: 'index',
    //   intersect: false,

    // },
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
          // text: 'Value'
        }
      }
    }
  }

  useEffect(() => {

    let dataX = [];
    let dataY = [];

        getStockGraphData(stock)
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
           <Line data={data} options={options} width={72} height={40} />
          </div>
  );
}


export default SmallGraph;
