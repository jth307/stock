import axios from 'axios';
const config = require('../../../server/helpers/config.js');

const BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
const TOKEN = config.API_TOKEN

  const getStockDetail = (stock) => {
    return axios
      .get(`${BASE_URL}${stock}/company?token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  export default getStockDetail



