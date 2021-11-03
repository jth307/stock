

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


function Graph() {

  const [graphXData, setGraphXData] = useState([])
  const [graphYData, setGraphYData] = useState([])

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
        backgroundColor: '#21CE99',
        borderColor: graphYData[graphYData.length-1] - graphYData[0] > 0 ? '#21CE99' : 'red',
        borderWidth: 1.8,
        pointRadius: 0,
        // pointBorderColor: '#000',
        // pointBackgroundColor: '#000',
        // pointHoverBackgroundColor: '#21CE99',
        // pointHoverBorderColor: '#000',
        // pointHoverBorderWidth: 1,
        // pointHoverRadius:6
      },
    ],
  };

  const options= {
    tooltips: {
      mode: 'index',
      intersect: false
    },
    label: {
      display:false,
    },
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        display: false,
        // type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat:'ll'
        },
      },
      // {
      //   display: false,
      //   title: {
      //     display: true,
      //     text: 'Month'
      //   }
      // },
      y: {
        display: false,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  }

  useEffect(() => {

    let dataX = [];
    let dataY = [];

        getStockGraphData('BABA')
        .then((res) => {
          console.log(res.data)

          for (let i = 0; i < res.data.length; i++) {
            dataX.push(res.data[i].minute);
            dataY.push(res.data[i].average)
          }
          setGraphXData(dataX);
          setGraphYData(dataY);
        })

  }, []);


  return (
    <div className='graph'>
           <Line data={data} options={options} />
          </div>
  );
}


export default Graph;
