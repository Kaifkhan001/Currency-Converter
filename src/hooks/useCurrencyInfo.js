import { useEffect, useState } from "react";
import axios from "axios";

function useCurrencyInfo(currency) {

  const fetchCurrencyInfo = () => {
    return axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
      )
      .then((response) => {
        const fetchedData = response.data[currency];
        setData(fetchedData); // Store fetched data in state
        return fetchedData; // Return the fetched data
      })
      .catch((error) => {
        console.error("Error while fetching currency info: ", error);
        throw error; // Rethrow error for handling in the component
      });
  };

  return { fetchCurrencyInfo, data };
}

export default useCurrencyInfo;
