

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


function Graph() {

  const [graphXData, setGraphXData] = useState([])
  const [graphYData, setGraphYData] = useState([])
  const [graphData, setGraphData] = useState([])


  const BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
  const TOKEN = 'pk_0bb2b9065996478c82fa4583b57d589b'




    const getStockGraphData = (stock) => {
      return axios
        .get(`${BASE_URL}${stock}/intraday-prices/?chartInterval=5&token=${TOKEN}`)
        .catch((error) => {
          console.error("Error", error.message);
        });
    };



    useEffect(() => {

      let dataX = [];
      let dataY = [];

          getStockGraphData('MSFT')
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

  // useEffect(()=>{
  //   mockData()

  // },[]);

  return (
    <div className='graph'>
           <Line data={data} options={options} />
          </div>
  );
}




export default Graph;
