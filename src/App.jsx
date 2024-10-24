import { useState, useEffect } from "react";
import Inputbox from "./components/inputbox";
import axios from 'axios';

function App() {
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const disabled = false;

  function useCurrencyInfo(currency) {
    const fetchCurrencyInfo = () => {
      return axios
        .get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        )
        .then((response) => {
          const fetchedData = response.data[currency];
          return fetchedData;
        })
        .catch((error) => {
          console.error("Error while fetching currency info: ", error);
          throw error;
        });
    };

    return { fetchCurrencyInfo };
  }

  
  useEffect(() => {
    setLoading(true); 
    const { fetchCurrencyInfo } = useCurrencyInfo(from);
    fetchCurrencyInfo()
      .then((fetchedData) => {
        setOptions(fetchedData);
        setLoading(false); 
      })
      .catch((err) => {
        setError(err); 
        setLoading(false); 
      });
  }, [from,to]); 

  useEffect(() => {
    if (options[to]) {
      setConvertedAmount((amount * options[to]).toFixed(2));
    }
  }, [amount, from, to, options]);

  const HandleAmountChange = (e) => {
    setAmount(e);
  };

  const handleCurrencyFromChange = (e) => {
    setFrom(e);
  };

  const handleCurrencyToChange = (e) => {
    setTo(e);
  }

   const handleSwap = () => {
     setTo(from);
     setFrom(to);
     setAmount(convertedAmount);
     setConvertedAmount(amount);
   };

  return (
    <div
      className="w-screen h-screen bg-cover overflow-hidden flex flex-wrap items-center justify-center"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2022/12/14/08/59/money-7654880_1280.jpg')`,
      }}
    >
      <div className="box  border-4 min-h-72 bg-sky-800 px-6 bg-opacity-60 py-8 rounded-lg flex items-center justify-center gap-4 flex-col">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error.message}</p>}{" "}
        <Inputbox
          label="From"
          amount={amount}
          onAmountChange={HandleAmountChange}
          onCurrencyChange={handleCurrencyFromChange}
          options={Object.keys(options)}
          value={from}
        />
        <button
          onClick={handleSwap}
          className="px-[1.4rem] py-2 bg-orange-600 text-white font-semibold rounded-lg absolute hover:bg-orange-700"
        >
          Swap
        </button>
        <Inputbox
          label={"To"}
          amount={convertedAmount}
          disabled={disabled}
          onCurrencyChange={handleCurrencyToChange}
          options={Object.keys(options)}
          value={to}
        />
      </div>
    </div>
  );
}

export default App;
