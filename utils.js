// Description: Contains utility functions

/**
 * Returns a list of squares in the format {position: "a1", color: "dark"}
 * @returns {Array} squares
 */
export function allSquares() {
  let squares = [];

  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      // Convert j into corresponding letter (a-h)
      let file = String.fromCharCode("a".charCodeAt(0) + j - 1);

      // 8 - i + 1 since the rows should start from 8 at the top and go down to 1
      let rank = 8 - i + 1;

      let color = (i + j) % 2 === 0 ? "light" : "dark";

      squares.push({
        position: `${file}${rank}`,
        color: color,
      });
    }
  }

  return squares;
}

/**
 * Returns a random set of squares
 * @param {int} numberOfSquares
 * @returns {Array} squares
 */
export function randomSquares(numberOfSquares) {
  let allSquareList = allSquares();
  const selectedSquares = new Set();

  while (selectedSquares.size < numberOfSquares) {
    let randomIndex = Math.floor(Math.random() * allSquareList.length);
    selectedSquares.add(allSquareList[randomIndex]);
  }

  return Array.from(selectedSquares);
}

export function countLightSquares(squares) {
  let lightSquares = squares.filter((square) => square.color === "light");

  return lightSquares.length;
}

export function countDarkSquares(squares) {
  let darkSquares = squares.filter((square) => square.color === "dark");

  return darkSquares.length;
}
