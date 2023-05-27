"use client";
import { useEffect, useState } from "react";
import { randomSquares, isLightSquare } from "@/utils";

const BUTTON_CLASSES =
  "active:translate-y-px relative border border-gray-300 mx-1 py-2 px-4 rounded-lg shadow-md transition-transform duration-200 ease-in-out cursor-pointer z-10 text-md font-medium ";

const Square = ({
  position,
  isSelected,
  isCorrect,
  isSubmitted,
  toggleSelection,
}) => {
  let squareColor = "bg-white";
  if (isSelected) {
    squareColor = "bg-blue-500";
  }
  if (isSubmitted) {
    if (isCorrect) {
      squareColor = "bg-green-500";
    } else if (isSelected) {
      squareColor = "bg-red-500";
    }
  }
  return (
    <button
      onClick={() => !isSubmitted && toggleSelection(position)}
      className={`${BUTTON_CLASSES} ${squareColor}`}
    >
      {position}
    </button>
  );
};

const Light = () => {
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [squareList, setSquareList] = useState([]);

  useEffect(() => {
    setSquareList(randomSquares(8));
  }, []);

  const toggleSelection = (position) => {
    if (selectedSquares.includes(position)) {
      setSelectedSquares(
        selectedSquares.filter((square) => square !== position)
      );
    } else {
      setSelectedSquares([...selectedSquares, position]);
    }
  };

  const reset = () => {
    setIsSubmitted(false);
    setSelectedSquares([]);
    setSquareList(randomSquares(8));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctSquares = squareList
      .filter((square) => isLightSquare(square))
      .map((square) => square.position);
    setIsCorrect(
      JSON.stringify(selectedSquares.sort()) ===
        JSON.stringify(correctSquares.sort())
    );
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-gray-100 text-gray-800">
      <p className="text-xl mb-4">Select the light squares:</p>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {
          // list of 8 random chess squares
          squareList.map(({ position, color }) => (
            <Square
              key={position}
              position={position}
              color={color}
              isSelected={selectedSquares.includes(position)}
              isCorrect={isLightSquare({ position, color })}
              isSubmitted={isSubmitted}
              toggleSelection={toggleSelection}
            />
          ))
        }
      </div>
      <div className="flex justify-center space-x-4 mt-8 mb-8">
        <button
          onClick={handleSubmit}
          className={`bg-blue-500 text-white ${BUTTON_CLASSES}`}
        >
          Submit
        </button>
        <button
          onClick={reset}
          className={`${BUTTON_CLASSES} text-white bg-gray-500 flex items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </button>
      </div>
      <p
        className={`mt-4 text-xl h-6 ${
          isCorrect ? "text-green-600" : "text-red-600"
        }`}
      >
        {isSubmitted ? (
          isCorrect ? (
            "Correct!"
          ) : (
            "Incorrect!"
          )
        ) : (
          <span className="text-transparent">Placeholder</span>
        )}
      </p>
    </div>
  );
};

export default Light;
