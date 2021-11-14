import axios from 'axios';
const finnhub = require('finnhub');
const config = require('../../server/helpers/config.js');

const CLOUD_BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
const CLOUD_TOKEN = config.CLOUD_API_TOKEN

const FINN_BASE_URL = 'https://finnhub.io/api/v1/quote?symbol='
const FINN_TOKEN = config.FINN_API_TOKEN

const NEWS_TOKEN = config.NEWS_API_TOKEN

const apiRoutes = {

  ///////FRONTEND/////////

  getStockDetail : function(stock) {
    return axios
      .get(`${CLOUD_BASE_URL}${stock}/company?token=${CLOUD_TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  fetchGeneralNews : function() {
    return axios
      .get(`https://gnews.io/api/v4/top-headlines?token=a975a8568ec204a4a2134acac70d3b61&lang=en`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  fetchStockNews : function(stock) {
    return axios
      .get(`${CLOUD_BASE_URL}${stock.toLowerCase()}/news/last/5?token=${CLOUD_TOKEN}`)
      // https://newsapi.org/v2/everything?q=${stock}&apiKey=${NEWS_TOKEN}
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  getStockData: function(stock) {
    return axios
      .get(`${FINN_BASE_URL}${stock}&token=${FINN_TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  getStockGraphData: function(stock, interval) {
    return axios
      .get(`${CLOUD_BASE_URL}${stock}/intraday-prices/?chartInterval=${interval.substring(0,1)}&token=${CLOUD_TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },


///////BACKEND/////////


  createUser: function (data) {
    return axios
    .post('/register/', data)
    .catch((error) => {
      throw new Error(error);
    });
  },

  authenticateUser: function (data) {
    return axios
    .post('/authenticate/', data)
    .catch((error) => {
      throw new Error(error);
    });
  },

  updateStockQuantity: function (data) {
    return axios
    .post('/updateStockQuantity/', data)
    .catch((error) => {
      throw new Error(error);
    });
  },

  getStocks: function (data) {
    return axios
    .post('/getStocks/', data)
    .catch((error) => {
      throw new Error(error);
    });
  },

  deleteStock: function (data) {
    return axios
    .post('/deleteStock/', data)
    .catch((error) => {
      throw new Error(error);
    });
  },

}


  export default apiRoutes







