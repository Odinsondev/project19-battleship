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
        let square = [[i, j], false, false];

        boardArray.push(square);
      }
    }
    return boardArray;
  };

  gameboard.boardArray = gameboard.createBoardArray();

  gameboard.shipsArray = [];

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

  //Places ship on the gameboard:
  //1. Changes boardArray square[1] from false to ship type string
  //2. Places the ship object into shipArray
  ///////////////////////////////////
  //Add logic to not go out of board boundaries!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //Add logic to prevent stacking ships onto each other!!!!!!!!!!!!!!!!1
  gameboard.placeShip = function (type, coordinatesArray, orientation) {
    const ship = createShip(type);
    const length = ship.length;

    function fillSquares(coordinatesArray, length, orientation) {
      if (orientation === 'vertical') {
        for (let i = 0; i < length; i++) {
          const coordinate1 = coordinatesArray[0];
          const coordinate2 = coordinatesArray[1];
          let newCoordinatesArray = [];
          newCoordinatesArray[0] = coordinate1;
          newCoordinatesArray[1] = coordinate2;
          newCoordinatesArray[0] = newCoordinatesArray[0] + i;
          const shipSquareIndex = gameboard.findIndex(newCoordinatesArray);
          gameboard.boardArray[shipSquareIndex][1] = type;
        }
      } else if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          const coordinate1 = coordinatesArray[0];
          const coordinate2 = coordinatesArray[1];
          let newCoordinatesArray = [];
          newCoordinatesArray[0] = coordinate1;
          newCoordinatesArray[1] = coordinate2;
          newCoordinatesArray[1] = newCoordinatesArray[1] + i;
          const shipSquareIndex = gameboard.findIndex(newCoordinatesArray);
          gameboard.boardArray[shipSquareIndex][1] = type;
        }
      }
    }
    fillSquares(coordinatesArray, length, orientation);

    gameboard.shipsArray.push(ship);
  };

  //Receives shots from enemy player
  //1. Records enemy shot location - changes boardArray square[2] from false to true
  //2. Checks if ship present on that square and updates its hit count
  gameboard.receiveAttack = function (coordinatesArray) {
    const attackedSquareIndex = gameboard.findIndex(coordinatesArray);

    //Records the attack by setting square[2] to true
    gameboard.boardArray[attackedSquareIndex][2] = true;

    //Checks if ship present on the attacked square
    if (gameboard.boardArray[attackedSquareIndex][1] !== false) {
      const shipType = gameboard.boardArray[attackedSquareIndex][1];

      for (let i = 0; i < gameboard.shipsArray.length; i++) {
        if (gameboard.shipsArray[i].type === shipType) {
          gameboard.shipsArray[i].hit();
        }
      }
    }
  };

  //Checks if all ships in shipsArray are sunk
  gameboard.checkIfAllSunk = function () {
    let areAllSunk = true;

    for (let i = 0; i < gameboard.shipsArray.length; i++) {
      if (gameboard.shipsArray[i].isSunk === false) {
        areAllSunk = false;
      }
    }

    return areAllSunk;
  };

  return gameboard;
}
