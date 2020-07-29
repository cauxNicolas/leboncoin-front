import React, { useState } from "react";
import axios from "axios";

const Search = ({ setData, title, setTitle }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [select, setSelect] = useState({ value: "date-asc" });

  // formulaire de recherche
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMinPrice = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // debut
    // https://attacomsian.com/blog/javascript-convert-object-to-query-string-parameters#

    const params = {
      title: title,
      minPrice,
      maxPrice,
      sort: select,
    };

    if (!minPrice) {
      delete params.minPrice;
    }
    if (!maxPrice) {
      delete params.maxPrice;
    }
    if (!select) {
      delete params.select;
    }

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    // fin
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/offer/with-count?" + queryString
    );

    setData(response.data);
  };

  return (
    <div id="search">
      <form id="formOffers" onSubmit={handleSubmit}>
        <div className="inputsPartOne">
          <input
            type="text"
            placeholder="Que recherchez-vous"
            value={title}
            onChange={handleTitleChange}
          />
          <input type="submit" value="Rechercher" />
        </div>
        <div className="inputsPartTwo">
          <div>
            <p>
              Prix entre
              <input type="number" value={minPrice} onChange={handleMinPrice} />
              et
              <input type="number" value={maxPrice} onChange={handleMaxPrice} />
            </p>
          </div>
          <div>
            <select value={select} onChange={handleSelect}>
              <option value="price-desc">tri : Plus cher</option>
              <option value="price-asc">tri : Moins cher</option>
              <option value="date-desc">tri : Plus récentes</option>
              <option value="date-asc">tri : Plus anciens</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
