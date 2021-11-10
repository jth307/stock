import axios from 'axios';
const finnhub = require('finnhub');
const config = require('../../server/helpers/config.js');

const CLOUD_BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
const CLOUD_TOKEN = config.CLOUD_API_TOKEN

const FINN_BASE_URL = 'https://finnhub.io/api/v1/quote?symbol='
const FINN_TOKEN = config.FINN_API_TOKEN

const NEWS_TOKEN = config.NEWS_API_TOKEN

const apiRoutes = {
  getStockDetail : function(stock) {
    return axios
      .get(`${CLOUD_BASE_URL}${stock}/company?token=${CLOUD_TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  fetchGeneralNews : function() {
    return axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  fetchStockNews : function(stock) {
    return axios
      .get(`https://newsapi.org/v2/everything?q=${stock}&apiKey=${NEWS_TOKEN}`)
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

  createUser: function (data) {
    return axios
    .post('http://localhost:9000/example/', data)
    // .then( res => { console.log(res.status) } )
    .catch((error) => {
      throw new Error(error);
    });

  }
}


  export default apiRoutes







