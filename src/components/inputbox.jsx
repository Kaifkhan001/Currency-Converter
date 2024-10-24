import React,{useEffect, useRef, useState} from 'react';


const Inputbox = ({
  label,
  amount,
  convertedAmount = 0,
  onAmountChange = "",
  onCurrencyChange,
  options,
  disabled = true,
  value

}) => {


  return (
    <div className="main max-w-30 sm:max-w-96 h-24  flex py-3 px-2  items-center justify-between border-2 border-black rounded-lg ">
      <label
        htmlFor="inputVal"
        className="flex flex-col items-start justify-between h-full "
      >
        {label}
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          readOnly={disabled ? false : true}
          className="px-1 outline-none py-0.5 text-base rounded-lg bg-transparent "
        />
      </label>
      <div className="flex flex-col items-start justify-between h-full ">
        <span className="text-[2vw] sm:text-[0.9rem]">Currency Type:-</span>
        <select
          name="currencyType"
          id="currencyType"
          className="px-2 py-2 rounded-lg"
          onChange={(e) => onCurrencyChange(e.target.value)}
          value={value}
        >
          {Array.from(options).map((currency, i) => {
            return (
              <option value={currency} key={i}>
                {currency.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Inputbox
