import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SpotGoldGraph({ data, spotPrice }) {
  const [options, setOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Price of gold per troy ounce (CAD)",
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  return (
    <>
      <h1>Spot price of Gold (CAD): ${spotPrice}</h1>
      <Line className="graph" data={data} options={options} />
    </>
  );
}

export default SpotGoldGraph;
