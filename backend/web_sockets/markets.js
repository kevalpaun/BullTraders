import Stock from "../models/stock.js";

const delay = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// const stockPrice = async (socket, currPrice, delayMs, stockTicker, fluctuationRange, stockId) => {
//   try {
//     let price = currPrice;
//     while (socket.connected) {
//       let up = Math.round(Math.random());
//       if (up) {
//         price += Math.random() * fluctuationRange;
//         up = false;
//       } else {
//         price -= Math.random() * fluctuationRange;
//         up = true;
//       }
//       if (price < 0) {
//         price = 0;
//       }
//       await Stock.findOneAndUpdate({ id: stockId }, { currentPrice: price })
//       socket.emit(stockTicker, price.toFixed(2));
//       await delay(delayMs);
//     }
//   } catch (error) {
//     socket.disconnect();
//     console.log("Market error", error);
//   }
// }
// ===============================new code =======================================
const stockPrice = async (socket, stockData, stockTicker, stockId) => {
  try {
    
    if (stockData) {
      const metaData = stockData?.["Meta Data"]
      const info = metaData && Object.keys(metaData)?.map((key) => {
        const newKey = key.split(". ")[1];
        return { [newKey]: stockData["Meta Data"][key] };
      });
      const time = Object.keys(stockData["Time Series (Daily)"]).reverse();
      const values = Object.values(stockData["Time Series (Daily)"]).reverse();
      const currentPrice = values[values.length-1]["4. close"]
      const res = { ...info, time, values };
      console.log("res ============>",{res,currentPrice,stockData})
      await Stock.findOneAndUpdate(
        { id: stockId },
        { currentPrice },
        { data: res }
      );
      socket.emit(stockTicker, {...res,currentPrice});
    }
  } catch (error) {
    socket.disconnect();
    console.log("Market error", error);
  }
};

export { stockPrice };
