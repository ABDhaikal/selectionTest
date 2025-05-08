"use client";

import { FC, useState } from "react";
import DisplayCard from "./components/DominoesCard";

const Home = () => {
  const initalData: number[][] = [
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
  ];

  const [ArrCards, setArrCards] = useState<number[][]>(initalData);
  const [errMsg, setErrMsg] = useState<string>("");
  const [errMsgRmv, setErrMsgRmv] = useState<string>("");
  const [valueToRemove, setValueToRemove] = useState<number | null>(null);

  const handleRemoveDuplicate = () => {
    const uniqueData = ArrCards.filter((item, index, self) => {
      return (
        index === self.findIndex((t) => t[0] === item[0] && t[1] === item[1]) &&
        index ===
          self.findLastIndex((t) => t[0] === item[0] && t[1] === item[1])
      );
    });
    setArrCards(uniqueData);
  };

  const handleFlip = () => {
    const flippedData = ArrCards.map((item) => [item[1], item[0]]);
    setArrCards(flippedData);
  };

  const handleRemove = (value: number) => {
    const filteredData = ArrCards.filter((item) => item[0] + item[1] !== value);
    setArrCards(filteredData);
  };

  const handleSortAsc = () => {
    const sortedData = [...ArrCards].sort(
      (a, b) => a[0] + a[1] - (b[0] + b[1])
    );
    setArrCards(sortedData);
  };

  const handleSortDesc = () => {
    const sortedData = [...ArrCards].sort(
      (a, b) => b[0] + b[1] - (a[0] + a[1])
    );

    setArrCards(sortedData);
  };

  const findDoubleNumber = () => {
    const double = ArrCards.filter((item, index, self) => {
      return item[0] === item[1];
    });
    return double.length;
  };

  const handleReset = () => {
    setArrCards(initalData);
    setErrMsg("");
    setErrMsgRmv("");
    setValueToRemove(null);
  };

  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen p-4">
      <h1 className="font-bold text-4xl mb-2">Dominoes </h1>
      <div className="bg-slate-50 grid  gap-1 border border-gray-300 text-black p-2 rounded-md ">
        <h2 className="font-bold">Source </h2>
        <p>
          [
          {ArrCards.map((ar) => {
            return `[${ar[0]},${ar[1]}]`;
          })}
          ]
        </p>
      </div>

      <div className="bg-slate-50  gap-2 border border-gray-300 text-black p-2 rounded-md my-2 ">
        <h2 className="font-bold">Double Number </h2>
        <p>{findDoubleNumber()}</p>
      </div>

      <div className="flex  gap-2 my-2">
        {ArrCards.map((data, index) => (
          <div key={index} className="grid flex-row">
            <DisplayCard data={data} />
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border-2 border-gray-300 p-2 mt-4"
        placeholder="Enter new data"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const newData = e.currentTarget.value.split(",").map(Number);
            if (newData.length !== 2) {
              setErrMsg(
                "Please enter exactly two numbers separated by a comma."
              );
              return;
            }
            setArrCards((prev) => [...prev, newData]);
            e.currentTarget.value = "";
            setErrMsg("");
          }
        }}
      />
      <div className="text-red-500 mt-4">{errMsg}</div>
      <div className="flex gap-2 items-center mt-4">
        <button className="customButton" onClick={handleSortAsc}>
          Sort (ASC)
        </button>
        <button className="customButton" onClick={handleSortDesc}>
          Sort (DSC)
        </button>
        <button className="customButton" onClick={handleFlip}>
          Flip
        </button>
        <button className="customButton" onClick={handleRemoveDuplicate}>
          Remove Dup
        </button>
        <button className="customButton" onClick={handleReset}>
          Reset
        </button>
      </div>
      <input
        type="text"
        className="border-2 border-gray-300 p-2 mt-4"
        value={valueToRemove ?? ""}
        placeholder="Input Number"
        onChange={(e) => {
          const value = e.currentTarget.value;
          if (value === "") {
            setValueToRemove(null);
            setErrMsgRmv("");
          } else {
            const numberValue = Number(value);
            if (!isNaN(numberValue)) {
              setValueToRemove(numberValue);
            } else {
              setErrMsgRmv("invalid input");
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (valueToRemove !== null) {
              handleRemove(valueToRemove);
              setValueToRemove(null);
              setErrMsgRmv("");
            } else {
              setErrMsgRmv("Please enter a valid number.");
            }
          }
        }}
      />
      <button
        className="customButton w-fit"
        onClick={() => {
          if (valueToRemove !== null) {
            handleRemove(valueToRemove);
            setValueToRemove(null);
            setErrMsgRmv("");
          } else {
            setErrMsgRmv("Please enter a valid number.");
          }
        }}
      >
        Remove
      </button>
      <div className="text-red-500 mt-4">{errMsgRmv}</div>
    </div>
  );
};

export default Home;
