import React, { useState, useEffect } from "react";

import "./index.css";

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

const API_KEY = "lv02xaevftmc581f5g40kt6k71aj8dwx8d5se8d6l10f6hzbxb04qe1f1ywk";

let response;

let labelSet;

let dataSet;

let data;

let options;

function App(props) {
  const [goldParams, setGoldParams] = useState({
    goldPrice: 0,
    weight: 0,
    purity: 10,
  });
  const [submitted, setSubmitted] = useState(false);
  const [calculated, setCalculated] = useState(0);
  const [successfullCall, setSuccessfullCall] = useState(false);
  const [spotPrice, setSpotPrice] = useState(0);

  useEffect(() => {
    //console.log("hello");
    /*const constructURL = (apiKey) => {
      let endpoint = "https://metals-api.com/api/timeseries";
      let access_key = apiKey;
      var today = new Date();
      let currentDay = String(today.getDate()).padStart(2, "0");
      let currentMonth = String(today.getMonth() + 1).padStart(2, "0");
      let currentYear = today.getFullYear();
      let end_date = `${currentYear}-${currentMonth}-${currentDay}`;
      let start_date = `${currentYear - 1}-${currentMonth}-${currentDay}`;
      let base = "CAD";
      let symbols = "XAU";
      return `${endpoint}?access_key=${access_key}&start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${symbols}`;
    };
    const url = constructURL(API_KEY);

    const getGoldPrice = async () => {
      try {
        let goldHistory = [];
        const response = await fetch(url);
        if (response.ok) {
          const jsonResponse = await response.json();
          //console.log(jsonResponse);
          //console.log(JSON.stringify(jsonResponse));
          const ratesObj = jsonResponse["rates"];
          for (let date in ratesObj) {
            goldHistory.push([date, ratesObj[date]["XAU"]]);
          }
          //console.log(goldHistory);
          const lastDate = goldHistory[goldHistory.length - 1][0].substring(8);
          goldHistory = goldHistory.filter((item) => {
            //console.log(item);
            if (item[0].substring(8) == lastDate) {
              return true;
            }
            return false;
          });
          data = {
            datasets: [
              {
                label: "CAD",
                data: goldHistory,
                borderColor: "rgb(212,	175, 55)",
                backgroundColor: "rgba(212,	175, 55, 0.5)",
              },
            ],
          };

          options = {
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
          };
          //console.log(goldHistory);
          setSpotPrice(goldHistory[goldHistory.length - 1][1].toFixed(2));
          setGoldParams((prev) => {
            return {
              ...prev,
              goldPrice: goldHistory[goldHistory.length - 1][1].toFixed(2),
            };
          });
          setSuccessfullCall(true);
          return goldHistory;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGoldPrice();*/

    //saved data from api call remove code when actually calling api
    let goldHistory = [
      ["2021-06-16", 2264.4677012821435],
      ["2021-07-16", 2305.9486306428294],
      ["2021-08-16", 2226.800838994522],
      ["2021-09-16", 2265.1700427243795],
      ["2021-10-16", 2187.8513339970527],
      ["2021-11-16", 2329.850543846263],
      ["2021-12-16", 2282.7244463686698],
      ["2022-01-16", 2282.782389993701],
      ["2022-02-16", 2358.0233466628065],
      ["2022-03-16", 2448.9847594673547],
      ["2022-04-16", 2489.863997947139],
      ["2022-06-16", 2357.107088318861],
    ];
    data = {
      datasets: [
        {
          label: "CAD",
          data: goldHistory,
          borderColor: "rgb(212,	175, 55)",
          backgroundColor: "rgba(212,	175, 55, 0.5)",
        },
      ],
    };

    options = {
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
    };
    //console.log(goldHistory);
    setSpotPrice(goldHistory[goldHistory.length - 1][1].toFixed(2));
    setGoldParams((prev) => {
      return {
        ...prev,
        goldPrice: goldHistory[goldHistory.length - 1][1].toFixed(2),
      };
    });
    setSuccessfullCall(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const res =
      goldParams.weight *
      (1 / 31.1034768) *
      (goldParams.purity / 24) *
      goldParams.goldPrice;
    setCalculated(res);
  };

  const handleGoldPriceChange = ({ target }) => {
    setGoldParams((prev) => {
      return {
        ...prev,
        goldPrice: target.value,
      };
    });
  };

  const handleWeightChange = ({ target }) => {
    setGoldParams((prev) => {
      return {
        ...prev,
        weight: target.value,
      };
    });
  };

  const handlePurityChange = ({ target }) => {
    setGoldParams((prev) => {
      return {
        ...prev,
        purity: target.value,
      };
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Gold Jewellery Calculator</h1>
      </header>
      <main>
        <section className="card">
          <article>
            <h1>How the cost of jewellery is calculated</h1>
            <br />
            <p>
              Jewellery is worth the value of the alloy that is used to make it
              and the cost of the associated labor to produce it. When it comes
              to gold jewellery, the metals that make up the alloy is gold and
              some other metal that the gold is mixed with for structural or
              aesthetic purposes. The greater the percentage of gold that is
              used in the alloy, the greater the "purity" of the gold. This
              purity is measured in Karats. If the jewellery is made up of 24K
              gold, that means that the fraction of gold that makes up the gold
              alloy is 24/24. If the jewellery is made up of 10K gold, that
              means that the fraction of gold that makes up the gold alloy is
              only 10/24. In other words, 14/24 of the alloy used to make the
              jewellery is NOT gold. In the United States, the minimum fraction
              of Gold that is needed for jewellery to be classified as gold is
              10K.
            </p>
          </article>
        </section>
        <section className="card">
          <h1>Spot price of Gold (CAD): ${spotPrice}</h1>
          {successfullCall && (
            <Line className="graph" data={data} options={options} />
          )}
        </section>
        <br />
        <section className="card">
          <div className="calc">
            <form className="calc-form" onSubmit={handleSubmit}>
              <label htmlFor="goldPrice">Spot price of Gold(toz):</label>
              <br />
              <input
                type="numeric"
                name="goldPrice"
                id="goldPrice"
                value={goldParams.goldPrice}
                onChange={handleGoldPriceChange}
              />
              <br />
              <label htmlFor="weight">Weight of Jewellery(grams):</label>
              <br />
              <input
                type="numeric"
                name="weight"
                id="weight"
                value={goldParams.weight}
                onChange={handleWeightChange}
              />
              <br />
              <label htmlFor="purity">Purity of:</label>
              <select
                name="purity"
                value={goldParams.purity}
                onChange={handlePurityChange}
              >
                <option value={10}>10K</option>
                <option value={14}>14K</option>
                <option value={18}>18K</option>
                <option value={22}>22K</option>
                <option value={24}>24K</option>
              </select>
              <br />
              <input type="submit" value="Calculate" />
            </form>
            {submitted && (
              <h1 className="jewellery-value">${calculated.toFixed(2)}</h1>
            )}
          </div>
        </section>
      </main>
      <footer>Copyright @2022 GurneckJohal</footer>
    </div>
  );
}

export default App;
