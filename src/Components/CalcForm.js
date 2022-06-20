import React, { useState, useEffect } from "react";

function CalcForm({ spotPrice }) {
  const [goldParams, setGoldParams] = useState({
    goldPrice: spotPrice,
    weight: 0,
    purity: 10,
  });
  const [submitted, setSubmitted] = useState(false);
  const [calculated, setCalculated] = useState(0);

  useEffect(() => {
    setGoldParams((prev) => {
      return {
        ...prev,
        goldPrice: spotPrice,
      };
    });
  }, [spotPrice]);

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
  );
}

export default CalcForm;
