import { stockPrice } from "./markets.js";
import Stock from "../models/stock.js";
import axios from "axios";

// const tickers = async (socket) => {
//   try {
//     const allStocks = await Stock.find();
//     console.log("----------------->", allStocks);
//     for (let i = 0; i < allStocks.length; i++) {
//       let fluctuationRange = Math.floor(Math.random() * 10);
//       let delayTime = Math.floor(Math.random() * (3000 - 1500) + 1500);
//       stockPrice(
//         socket,
//         allStocks[i].currentPrice,
//         delayTime,
//         allStocks[i].ticker,
//         fluctuationRange,
//         allStocks[i].id
//       );
//     }
//   } catch (error) {
//     console.log("Stock fetching error:", error);
//   }
// };

// =========================================new code ==================================================

const tickers = async (socket) => {
  try {
    const allStocks = await Stock.find();

    allStocks.forEach(async (stock) => {
      const stockData = await fetchRealTimeData(stock.ticker);
      stockPrice(socket, stockData, stock.ticker, stock.id);
    });
  } catch (error) {
    console.log("Stock fetching error:", error);
  }
};

const fetchRealTimeData = async (ticker) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}.BSE&interval=1min&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

    try {
      const response = await axios.get(url, {
        headers: { "User-Agent": "request" },
      });
      console.log("res ============>",response)
      return response.data;
    } catch (error) {
      console.error("Error fetching real-time data for", ticker, error);
      return null;
    }
};

export { tickers };
