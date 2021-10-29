import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Promise from 'bluebird'
import StatsRow from './StatsRow';
const finnhub = require('finnhub');




function Stats() {

  const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol='
  const TOKEN = 'c5t3qhaad3icf7iiomug'
  // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  // api_key.apiKey = "c5t3qhaad3icf7iiomug" // Replace this
  // const finnhubClient = new finnhub.DefaultApi()



    const [stockData, setStockData] = useState([]);


    const getStockData = (stock) => {
      return axios
        .get(`${BASE_URL}${stock}&token=${TOKEN}`)
        .catch((error) => {
          console.error("Error", error.message);
        });
    };

    // curl "https://finnhub.io/api/v1/quote?symbol=AAPL&token=c5t3qhaad3icf7iiomug"


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
        setStockData(testData);
      })
    }, []);

    console.log(stockData)

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
