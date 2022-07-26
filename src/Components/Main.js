import React, { useState, useEffect } from "react";
import GoldArticle from "./GoldArticle";
import CalcForm from "./CalcForm";
import SpotGoldGraph from "./SpotGoldGraph";

function Main() {
  const [successfullCall, setSuccessfullCall] = useState(false);
  const [spotPrice, setSpotPrice] = useState(0);
  const [data, setData] = useState({
    datasets: [
      {
        label: "CAD",
        data: [],
        borderColor: "rgb(212,	175, 55)",
        backgroundColor: "rgba(212,	175, 55, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const API_KEY =
      "lv02xaevftmc581f5g40kt6k71aj8dwx8d5se8d6l10f6hzbxb04qe1f1ywk";
    const constructURL = (apiKey) => {
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
          const ratesObj = jsonResponse["rates"];
          for (let date in ratesObj) {
            goldHistory.push([date, ratesObj[date]["XAU"]]);
          }
          const lastDate = goldHistory[goldHistory.length - 1][0].substring(8);
          goldHistory = goldHistory.filter((item) => {
            if (item[0].substring(8) == lastDate) {
              return true;
            }
            return false;
          });
          setData((prev) => {
            return {
              ...prev,
              datasets: [
                {
                  label: "CAD",
                  data: goldHistory,
                  borderColor: "rgb(212,	175, 55)",
                  backgroundColor: "rgba(212,	175, 55, 0.5)",
                },
              ],
            };
          });
          setSpotPrice(goldHistory[goldHistory.length - 1][1].toFixed(2));
          setSuccessfullCall(true);
          return goldHistory;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGoldPrice();
    /*
    //saved data from api call (remove code when actually calling api)
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
    setData((prev) => {
      return {
        ...prev,
        datasets: [
          {
            label: "CAD",
            data: goldHistory,
            borderColor: "rgb(212,	175, 55)",
            backgroundColor: "rgba(212,	175, 55, 0.5)",
          },
        ],
      };
    });
    setSpotPrice(goldHistory[goldHistory.length - 1][1].toFixed(2));
    setSuccessfullCall(true);*/
  }, []);

  return (
    <main>
      <section>
        <GoldArticle />
      </section>
      <section>
        {successfullCall && <SpotGoldGraph data={data} spotPrice={spotPrice} />}
      </section>
      <section>
        <CalcForm spotPrice={spotPrice} />
      </section>
    </main>
  );
}

export default Main;
