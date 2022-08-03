import { iex } from "../config/iex";

export const stock = {
  latestPrice: (ticker, callback) => {
    fetch(stock.latestPriceURL(ticker))
      .then((response) => response.json())
      .then((data) => callback(stock.formatPriceData(data)));
  },

  //   Change the URL according to the data source. Currently we are using IEX API

  latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=2&token=${iex.api_token}`;
  },

    // for indian market, needs to make changes according
    // return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=sbin.bse&interval=1min&apikey=N6EBN7XD16JOD5K3`

  //   Make changes here according to the data coming from API Endpoint
  formatPriceData: (data) => {
    const stockData = data[0];
    const formattedData = {};


    formattedData.price = stockData.close;
    formattedData.date = stockData.date;
    formattedData.time = stockData.label;
    return formattedData;
  },


  getYesterdaysClose: (ticker, lastTradingDate, callback) => {
      if (lastTradingDate != "" && lastTradingDate != undefined) {
      const url = stock.yesterdaysCloseURL(ticker, stock.formatDate(lastTradingDate))
      fetch(url).then((response) => response.json()).then((data) => callback(stock.formatPriceData(data)));
    }
  },


  getLastTradingDate: () => {
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const url = `${iex.base_url}/ref-data/us/dates/trade/last/2/${today}?token=${iex.api_token}`;
    return fetch(url).then((res) => res.json());
  },


  yesterdaysCloseURL: (ticker, lastTradingDate) => {
    // let lastTradingDate = stock.formatDate(date)
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=2&exactDate=${lastTradingDate}&token=${iex.api_token}`;
  },

  formatDate: (date) => {
    return new Date(date).toISOString().split("T")[0].replace(/-/g, "");
  },
};
