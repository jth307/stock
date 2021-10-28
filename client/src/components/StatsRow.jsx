import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Promise from 'bluebird'




function StatsRow() {



    const [stockData, setStockData] = useState([]);

    const getStockData = (stock) => {
      return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error)=>{
        console.error(error.message)
      })

      setStockData(dataX);
    }



    useEffect(() => {

    }, []);

        return(
          <div className='stats'>

          </div>

        )

}

export default StatsRow;
