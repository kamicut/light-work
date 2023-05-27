"use client";
import { useEffect, useState } from "react";
import { randomSquares, countLightSquares } from "@/utils";

const Square = ({ position, color, isCorrect, isSubmitted }) => {
  let squareColor = "bg-white";
  if (isSubmitted && color === "light") {
    if (isCorrect) {
      squareColor = "bg-green-500";
    } else {
      squareColor = "bg-red-500";
    }
  }
  return (
    <div className={`p-4 shadow rounded text-center ${squareColor}`}>
      {position}
    </div>
  );
};

const Light = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [squareList, setSquareList] = useState([]);

  useEffect(() => {
    setSquareList(randomSquares(8));
  }, []);

  const handleChange = (e) => {
    setSelectedAnswer(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      selectedAnswer,
      countLightSquares(squareList),
      selectedAnswer === countLightSquares(squareList)
    );
    setIsCorrect(selectedAnswer === countLightSquares(squareList));
    setIsSubmitted(true);
  };
  console.log(" The answer is: ", countLightSquares(squareList));

  return (
    <div className="flex flex-col items-center justify-center mt-5 bg-gray-100 text-gray-800">
      <p className="text-xl mb-4">
        How many of the following are light squares?
      </p>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {
          // list of 8 random chess squares
          squareList.map(({ position, color }) => (
            <Square
              key={position}
              position={position}
              color={color}
              isCorrect={isCorrect}
              isSubmitted={isSubmitted}
            />
          ))
        }
      </div>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="mb-2" htmlFor="answer">
          Your Answer:
        </label>
        <select
          id="answer"
          className="mb-2 p-2 border rounded"
          onChange={handleChange}
        >
          {Array.from({ length: 9 }, (_, i) => i).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {isSubmitted && (
        <p
          className={`mt-4 text-xl ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect
            ? "Correct!"
            : `Incorrect! There are ${countLightSquares(
                squareList
              )} light squares.`}
        </p>
      )}
    </div>
  );
};

export default Light;
