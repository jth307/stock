import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Promise from 'bluebird'
import StatsRow from './StatsRow';
import apiRoutes from '../apiRoutes.js';

function Stats({changeStock,setFetchStatus}) {

    const [stockData, setStockData] = useState([]);
    const [myStocks, setMyStocks] = useState([]);


    const getMyStocks = () => {
          const myData = ['TWTR', 'PFE']
          let promises = [];
          let tempData = []
          myData.map((stock) => {
            promises.push(
              apiRoutes.getStockData(stock)
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


    useEffect(() => {

      const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
      const testData = [];

      getMyStocks();

      let promises = [];
      stocksList.map((stock) => {
        promises.push(
          apiRoutes.getStockData(stock)
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
      });
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
                        changeStock= {changeStock}
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
                        changeStock= {changeStock}
                      />
                    ))}
                    </div>
                  </div>
                </div>
          </div>
        )
}

export default Stats;
