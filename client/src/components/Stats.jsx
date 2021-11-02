import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Promise from 'bluebird'
import StatsRow from './StatsRow';
const finnhub = require('finnhub');

function Stats() {

  const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol='
  const TOKEN = 'c5t3qhaad3icf7iiomug'


    const [stockData, setStockData] = useState([]);
    const [myStocks, setMyStocks] = useState([]);


    const getMyStocks = () => {
          const myData = ['UNH', 'WBA']
          let promises = [];
          let tempData = []
          myData.map((stock) => {
            promises.push(
              getStockData(stock)
              .then((res) => {
                tempData.push({
                  name: stock,
                  ...res.data
                });
              })
            )
          });
          Promise.all(promises).then(()=>{
            setMyStocks(tempData);
          })
      }


    const getStockData = (stock) => {
      return axios
        .get(`${BASE_URL}${stock}&token=${TOKEN}`)
        .catch((error) => {
          console.error("Error", error.message);
        });
    };



    useEffect(() => {
      const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
      const testData = [];

      getMyStocks();

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


        return(
          <div className='stocks-div'>
                <div className='userStocks-div'>
                  <div className='stats-header'>
                    <p>Stocks Owned</p>
                  </div>
                  <div className='stats-content'>
                    <div className='stats-row'>
                    {myStocks.map((stock) => (
                      <StatsRow
                        key={stock.name}
                        name={stock.name}
                        openPrice={stock.o}
                        volume='120'
                        price={stock.c}
                      />
                    ))}
                    </div>
                  </div>
                  <div className='watchlist-div'>
                    <p>Watchlist</p>
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
