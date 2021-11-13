import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Promise from 'bluebird'
import StatsRow from './StatsRow';
import apiRoutes from '../../apiRoutes.js';

function Stats({changeStock,setFetchStatus,user,setSnapshot}) {

    const [stockData, setStockData] = useState([]);
    const [myStocks, setMyStocks] = useState([]);


    const getMyStocks = () => {
      apiRoutes.getStocks({userID:user.userID})
      .then((res) => {
        let promises = [];
        let tempData = []
        res.data.map((stock) => {
          promises.push(
            apiRoutes.getStockData(stock.stock)
            .then((res) => {
              tempData.push({
                name: stock.stock,
                quantity: stock.quantity,
                ...res.data
              });
            })
          )
        });
        Promise.all(promises).then(()=>{
          setMyStocks(tempData);
          let total = 0
          let change = 0
          let percentage = 0
          tempData.map((stock)=>{
            total += stock.c * stock.quantity;
            percentage += (stock.c - stock.o )/ stock.o * 100;
            change += stock.c - stock.o;
          })
          setSnapshot({total: total, changePercentage : percentage/tempData.length, priceChange : change/tempData.length })
        })
      })
      .catch((error)=> {
        console.log('getmystocks error',error);
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
              volume={stock.quantity}
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
