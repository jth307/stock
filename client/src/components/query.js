const finnhub = require('finnhub');
import axios from 'axios';


const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol='
const TOKEN = 'c5t3qhaad3icf7iiomug'
  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  export default getStockData