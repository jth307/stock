

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function Graph() {

  const [graphXData, setGraphXData] = useState([])
  const [graphYData, setGraphYData] = useState([])


  const data = {
    labels: graphXData,
    datasets: [
      {
        label: 'test',
        data: graphYData,
        fill: false,
        // backgroundColor: 'rgb(255, 99, 132)',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        type: 'line',
        backgroundColor: 'black',
        borderColor: '#21CE99',
        borderWidth: 1.5,
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

  const mockData = () => {
    let dataX = [];
    let dataY = [];
    let value = 50;
    for (let i = 0; i < 366 ; i++){
      let date = new Date;
      date.setHours(0,0,0,0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5? 1:0) * Math.random() *10);
      dataX.push(date)
      dataY.push(value)

    }
    setGraphXData(dataX);
    setGraphYData(dataY);
  }

  useEffect(()=>{
    mockData()

  },[]);

  return (
    <div className='graph'>
           <Line data={data} options={options} />
          </div>
  );
}




export default Graph;
