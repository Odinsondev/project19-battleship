export { createGameboard };

import { createShip } from './ship';

//Functions
function createGameboard() {
  const gameboard = {};

  //Creates gameboard array
  gameboard.createBoardArray = function () {
    const boardArray = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let square = [[i, j], false];

        boardArray.push(square);
      }
    }
    return boardArray;
  };

  gameboard.boardArray = gameboard.createBoardArray();

  //Finds the array index of a square based on the coordinates
  gameboard.findIndex = function (coordinatesArray) {
    for (let i = 0; i < gameboard.boardArray.length; i++) {
      if (
        gameboard.boardArray[i][0].toString() === coordinatesArray.toString()
      ) {
        return i;
      }
    }
  };

  //Places ship on the gameboard
  ///////////////////////////////////
  //Add logic to not go out of board boundaries!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  gameboard.placeShip = function (coordinatesArray, length, orientation) {
    const ship = createShip(length);

    function fillSquares(coordinatesArray, length, orientation) {
      if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          const coordinate1 = coordinatesArray[0];
          const coordinate2 = coordinatesArray[1];
          let newCoordinatesArray = [];
          newCoordinatesArray[0] = coordinate1;
          newCoordinatesArray[1] = coordinate2;
          newCoordinatesArray[0] = newCoordinatesArray[0] + i;
          const shipSquareIndex = gameboard.findIndex(newCoordinatesArray);
          gameboard.boardArray[shipSquareIndex][1] = true;

          console.log(gameboard.boardArray[shipSquareIndex]);
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < length; i++) {
          const coordinate1 = coordinatesArray[0];
          const coordinate2 = coordinatesArray[1];
          let newCoordinatesArray = [];
          newCoordinatesArray[0] = coordinate1;
          newCoordinatesArray[1] = coordinate2;
          newCoordinatesArray[1] = newCoordinatesArray[1] + i;
          const shipSquareIndex = gameboard.findIndex(newCoordinatesArray);
          gameboard.boardArray[shipSquareIndex][1] = true;
        }
      }
    }
    fillSquares(coordinatesArray, length, orientation);
  };

  return gameboard;
}
