

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function Graph() {

  const [graphData, setGraphData] = useState([])

  const data = [
    {
    x:10,
    y:20,
    },{
      x:15,
      y:10,
      },
];


  return (
    <div className='graph'>
            <Line
              data = {{
                datasets: [{
                  type: 'line',
                  data: data,
                  backgroundColor: 'black',
                  borderColor: '#21CE99',
                  borderWidth: 2,
                  pointBorderColor: '#000',
                  pointBackgroundColor: '#000',
                  pointHoverBackgroundColor: '#21CE99',
                  pointHoverBorderColor: '#000',
                  pointHoverBorderWidth: 4,
                  pointHoverRadius: 6

                }]
              }}
              options ={{
                legend: {
                  display: false
                }
              }}

            />
          </div>

  );
}




export default Graph;
