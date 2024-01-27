import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

const PriceChart = (props) => {
  const {
    id,
    legendDisplay,
    xDisplay,
    yDisplay,
    socket,
    ticker,
    currPrice,
    styleSet,
  } = props;
  Chart.register(...registerables);

  useEffect(() => {
    let mounted = true;

    const ctx = document.getElementById(id);
    const data = {
      labels: [Date.now()],
      datasets: [
        {
          data: [0],
          label: "Price",
          backgroundColor: "#10B981",
          borderColor: "#10B981",
        },
      ],
    };

    const optionsSet = {
      animation: true,
      plugins: {
        legend: {
          display: legendDisplay
        },
      },
      responsive: true,
      scales: {
        x: {
          display: xDisplay
        },
        y: {
          display: yDisplay
        },
      },
    };

    const chartDrawn = new Chart(ctx, {
      type: "line",
      data: data,
      options: optionsSet,
    });
    socket.on(ticker, (info) => {
      if (mounted) {
        const values = info.values.map((value) => value?.["4. close"]);
        data.labels = info.time;
        data.datasets[0].data = values
        // const openVal = info.values[0]?.['1. open'];
        // let length = data.labels.length;
        // if (length >= 5) {
        //   data.datasets[0].data.shift()
        //   data.labels.shift()
        // }
        // if(openVal> preVal) {
        //   data.datasets[0].borderColor = '#10B981';
        //   data.datasets[0].backgroundColor = '#10B981';
        // } else {
        //   data.datasets[0].borderColor = '#EF4444';
        //   data.datasets[0].backgroundColor = '#EF4444';
        // }
        // preVal = openVal;
        // data.labels.push(new Date().getTime())
        // data.labels.push(info.time)
        // data.datasets[0].data.push(parseFloat(openVal)).toFixed(2);
        chartDrawn.update();
      }
    });

    return () => {
      mounted = false;
      chartDrawn.destroy();
    };
  }, [id, legendDisplay, xDisplay, yDisplay, socket, ticker, currPrice]);

  return (
    <div className={styleSet}>
      <canvas id={id}></canvas>
    </div>
  );
};

export default PriceChart;
