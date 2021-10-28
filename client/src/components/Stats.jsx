import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Promise from 'bluebird'
import StatsRow from './StatsRow';



function Stats() {

  const BASE_URL = 'https://finnhub.io/api/v1/quote.api'
  const TOKEN = 'c5t3qhaad3icf7iiomug'


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
      const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
      const testData = [];

      let promises = [];
      stocksList.map((stock) => {
        promises.push(
          getStockData(stock)
          .then((res) => {
            testData.push({
              name: stock,
              ...res.data
            });
          })
        )
      });

      Promise.all(promises).then(()=>{
        console.log(testData);
        setStockData(testData);
      })
    }, []);

        return(
          <div className='stats'>
                <div className='stats-container'>
                  <div className='stats-header'>
                    <p>Stocks</p>
                  </div>
                  <div className='stats-content'>
                    <div className='stats-row'>
                    {/* {stockData.map((stock) => (
                      <StatsRow
                        key={stock.data.ticker}
                        name={stock.data.ticker}
                        openPrice={stock.info.o}
                        volume={stock.data.shares}
                        price={stock.info.c}
                      />
                    ))} */}
                    </div>
                  </div>
                  <div className='stats-header'>
                    <p>Lists</p>
                  </div>
                  <div className='stats-content'>
                    <div className='stats-row'>
                    {stockData.map((stock) => (
                      <StatsRow
                        key={stock.name}
                        name={stock.name}
                        openPrice={stock.o}
                        price={stock.c}
                      />
                    ))}
                    </div>
                  </div>
                </div>
          </div>

        )

}

export default Stats;
