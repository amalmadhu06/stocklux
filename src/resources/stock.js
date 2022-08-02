import { iex } from "../config/iex";

export const stock = {
  latestPrice: (ticker, callback) => {
    fetch(stock.latestPriceURL(ticker))
      .then((response) => response.json())
      .then((data) => callback(stock.formatPriceData(data)));
  },

  //   Change the URL according to the data source. Currently we are using IEX API

  latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  },

  //   Make changes here according to the data coming from API Endpoint

  formatPriceData: (data) => {
    const stockData = data[data.length - 1];
    const formattedData = {};
    formattedData.price = stockData.close;
    formattedData.date = stockData.date;
    formattedData.time = stockData.label;
    return formattedData;
  },

  getYesterdaysClose: (ticker, date, callback) => {
    fetch(stock.yesterdaysCloseURL(ticker, date))
      .then((response) => response.json())
      .then((data) => callback(stock.formatPriceData(data)));
  },



  yesterdaysCloseURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=20220729&token=${iex.api_token}`;
  },
  
};
