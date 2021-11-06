import axios from 'axios';
const config = require('../../../server/helpers/config.js');

const BASE_URL = 'https://cloud.iexapis.com/stable/stock/'
const TOKEN = config.API_TOKEN



const apiroutes = {
  getStockDetail : function(stock)  {
    return axios
      .get(`${BASE_URL}${stock}/company?token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  },

  fetchGeneralNews : function() {
    return axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=89ada765e31248c5b4658875ca682421`)
      .catch((error) => {
        console.error("Error", error.message);
      });

},

fetchStockNews : function(stock) {
  return axios
    .get(`https://newsapi.org/v2/everything?q=${stock}&apiKey=8868a878c38c47c183af5cdbde202881`)
    .catch((error) => {
      console.error("Error", error.message);
    });
}
}


  export default apiroutes





