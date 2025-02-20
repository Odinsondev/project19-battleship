export { startGame, addListeners, startGame2 };

import { createPlayer } from './player';
import { selectionFailedShip, orientationOfFailedShip } from './gameboard';

//initialize

//cache DOM
const player1 = createPlayer('real');
const player2 = createPlayer('computer');
const squareDivsArray = document.getElementsByClassName('board-square');
let turn = 'player1';

const playerText = document.getElementById('instructions');

const boardsWrapper = document.getElementById('boards-wrapper');
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');

//bind events

//functions
function startGame() {
  placePlayer2Ships();

  boardsWrapper.style.justifyContent = 'space-evenly';
  board1.style.borderRadius = '10px';
  board2.style.borderRadius = '10px';

  player1.renderBoard();
  player2.renderBoard();
  addListeners();
}

function placePlayer2ShipsTemp() {
  player2.board.placeShip('carrier', [4, 1], 'vertical');
  player2.board.placeShip('battleship', [1, 3], 'horizontal');
  player2.board.placeShip('cruiser', [4, 3], 'vertical');
  player2.board.placeShip('submarine', [4, 6], 'horizontal');
  player2.board.placeShip('destroyer', [6, 5], 'vertical');
}

//Places player 2 ships randomly
//Refactor to not have to randomly run many times to make legal placements
function placePlayer2Ships() {
  //location randomization
  function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const placementLocation = createRandomNumber(0, 100);

  const coordinates2 = [];

  const placementLocationString = placementLocation.toString();
  const placementLocationArray = placementLocationString.split('');

  if (placementLocationArray.length === 1) {
    coordinates2[0] = 0;
    coordinates2[1] = parseInt(placementLocationArray[0]);
  } else if (placementLocationArray.length === 2) {
    coordinates2[0] = parseInt(placementLocationArray[0]);
    coordinates2[1] = parseInt(placementLocationArray[1]);
  }

  //ship randomization
  let selectedShip2 = '';

  function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const shipNumber = createRandomNumber(0, 5);

  if (shipNumber === 0) {
    selectedShip2 = 'carrier';
  } else if (shipNumber === 1) {
    selectedShip2 = 'battleship';
  } else if (shipNumber === 2) {
    selectedShip2 = 'cruiser';
  } else if (shipNumber === 3) {
    selectedShip2 = 'submarine';
  } else if (shipNumber === 4) {
    selectedShip2 = 'destroyer';
  }

  //orientation randomizer
  let orientation2 = '';

  function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const orientationNumber = createRandomNumber(0, 2);

  if (orientationNumber === 0) {
    orientation2 = 'horizontal';
  } else if (orientationNumber === 1) {
    orientation2 = 'vertical';
  }

  console.log('running the function');

  //sending the place ship message etc
  if (player2.board.shipsArray.length === 0) {
    player2.board.placeShip(selectedShip2, coordinates2, orientation2);
    placePlayer2Ships();
    //only sends message if current type of board not on board
  } else if (player2.board.shipsArray.length === 1) {
    if (player2.board.shipsArray[0].type === selectedShip2) {
      placePlayer2Ships();
    } else {
      player2.board.placeShip(selectedShip2, coordinates2, orientation2);
      placePlayer2Ships();
    }
  } else if (player2.board.shipsArray.length === 2) {
    if (
      player2.board.shipsArray[0].type === selectedShip2 ||
      player2.board.shipsArray[1].type === selectedShip2
    ) {
      placePlayer2Ships();
    } else {
      player2.board.placeShip(selectedShip2, coordinates2, orientation2);
      placePlayer2Ships();
    }
  } else if (player2.board.shipsArray.length === 3) {
    if (
      player2.board.shipsArray[0].type === selectedShip2 ||
      player2.board.shipsArray[1].type === selectedShip2 ||
      player2.board.shipsArray[2].type === selectedShip2
    ) {
      placePlayer2Ships();
    } else {
      player2.board.placeShip(selectedShip2, coordinates2, orientation2);
      placePlayer2Ships();
    }
  } else if (player2.board.shipsArray.length === 4) {
    if (
      player2.board.shipsArray[0].type === selectedShip2 ||
      player2.board.shipsArray[1].type === selectedShip2 ||
      player2.board.shipsArray[2].type === selectedShip2 ||
      player2.board.shipsArray[3].type === selectedShip2
    ) {
      placePlayer2Ships();
    } else {
      player2.board.placeShip(selectedShip2, coordinates2, orientation2);
      placePlayer2Ships();
    }
  }
}

//Adds event listeners to the other player's board
//refactor code to remove duplicate code
function addListeners() {
  if (turn === 'player1') {
    for (let i = 100; i < 200; i++) {
      if (squareDivsArray[i].getAttribute('listener') !== 'true') {
        squareDivsArray[i].addEventListener('mouseover', shade);
        squareDivsArray[i].addEventListener('mouseout', removeShade);
        squareDivsArray[i].addEventListener('click', passAttack);
        squareDivsArray[i].setAttribute('listener', 'true');
        //attribute to check if event listeners need to be added
      }

      function shade() {
        squareDivsArray[i].style.filter = 'brightness(0.8)';
      }

      function removeShade() {
        squareDivsArray[i].style.filter = 'brightness(1)';
      }

      function passAttack() {
        const coordinates = [];
        const indexNumber = i;
        const indexNumberString = indexNumber.toString();
        const indexNumberArray = indexNumberString.split('');

        let playerBeingAttacked = '';

        //Turns squareDivsArray index into array of coordinates
        if (indexNumberArray.length === 1) {
          coordinates[0] = 0;
          coordinates[1] = parseInt(indexNumberArray[0]);
          playerBeingAttacked = player1;
        } else if (indexNumberArray.length === 2) {
          coordinates[0] = parseInt(indexNumberArray[0]);
          coordinates[1] = parseInt(indexNumberArray[1]);
          playerBeingAttacked = player1;
        } else if (indexNumberArray.length === 3) {
          coordinates[0] = parseInt(indexNumberArray[1]);
          coordinates[1] = parseInt(indexNumberArray[2]);
          playerBeingAttacked = player2;
        }

        //Checks if location already attacked and attacks again
        const attackedSquareIndex = player2.board.findIndex(coordinates);
        if (player2.board.boardArray[attackedSquareIndex][2] === true) {
          addListeners();
          return;
        }

        playerBeingAttacked.board.receiveAttack(coordinates);

        playerBeingAttacked.renderBoard();

        if (playerBeingAttacked.board.checkIfAllSunk() === true) {
          alert('Game Over');
          createStartNewGameButton();
        }

        turnCounter();
        addListeners();
      }
    }
  } else if (turn === 'player2') {
    //This code is useless until adding 2 'real' player support
    for (let i = 0; i < 100; i++) {
      if (squareDivsArray[i].getAttribute('listener') !== 'true') {
        squareDivsArray[i].addEventListener('mouseover', shade);
        squareDivsArray[i].addEventListener('mouseout', removeShade);
        squareDivsArray[i].addEventListener('click', passAttack);
        squareDivsArray[i].setAttribute('listener', 'true');
        //attribute to check if event listeners need to be added
      }

      function shade() {
        squareDivsArray[i].style.filter = 'brightness(0.8)';
      }

      function removeShade() {
        squareDivsArray[i].style.filter = 'brightness(1)';
      }

      function passAttack() {
        const coordinates = [];
        const indexNumber = i;
        const indexNumberString = indexNumber.toString();
        const indexNumberArray = indexNumberString.split('');

        let playerBeingAttacked = '';

        //Turns squareDivsArray index into array of coordinates
        if (indexNumberArray.length === 1) {
          coordinates[0] = 0;
          coordinates[1] = parseInt(indexNumberArray[0]);
          playerBeingAttacked = player1;
        } else if (indexNumberArray.length === 2) {
          coordinates[0] = parseInt(indexNumberArray[0]);
          coordinates[1] = parseInt(indexNumberArray[1]);
          playerBeingAttacked = player1;
        } else if (indexNumberArray.length === 3) {
          coordinates[0] = parseInt(indexNumberArray[1]);
          coordinates[1] = parseInt(indexNumberArray[2]);
          playerBeingAttacked = player2;
        }

        //Checks if location already attacked and attacks again
        const attackedSquareIndex = player1.board.findIndex(coordinates);
        console.log(attackedSquareIndex);
        if (player1.board.boardArray[attackedSquareIndex][2] === true) {
          addListeners();
          return;
        }

        playerBeingAttacked.board.receiveAttack(coordinates);

        playerBeingAttacked.renderBoard();

        if (playerBeingAttacked.board.checkIfAllSunk() === true) {
          alert('Game Over');
        }

        turnCounter();
        addListeners();
      }
    }
  }
}

//change function name
function turnCounter() {
  if (turn === 'player1') {
    turn = 'player2';
    playerText.textContent = 'Turn: Player Two';

    //when updating game to include 2 players, refactor this code
    setTimeout(computerAttack, 250);
  } else if (turn === 'player2') {
    turn = 'player1';
    playerText.textContent = 'Turn: Player One';
  }
}

function computerAttack() {
  function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const attackLocation = createRandomNumber(0, 100);

  const coordinates = [];

  const attackLocationString = attackLocation.toString();
  const attackLocationArray = attackLocationString.split('');

  if (attackLocationArray.length === 1) {
    coordinates[0] = 0;
    coordinates[1] = parseInt(attackLocationArray[0]);
  } else if (attackLocationArray.length === 2) {
    coordinates[0] = parseInt(attackLocationArray[0]);
    coordinates[1] = parseInt(attackLocationArray[1]);
  }

  //Checks if location already attacked and attacks again
  const attackedSquareIndex = player1.board.findIndex(coordinates);
  if (player1.board.boardArray[attackedSquareIndex][2] === true) {
    computerAttack();
    return;
  }

  player1.board.receiveAttack(coordinates);

  player1.renderBoard();

  if (player1.board.checkIfAllSunk() === true) {
    alert('Game Over');
  }

  turnCounter();
  addListeners();
}

function startGame2() {
  //add code to clear board if new game
  //Resets player1 board
  for (let i = 0; i < player1.board.boardArray.length; i++) {
    player1.board.boardArray[i][1] = false;
    player1.board.boardArray[i][2] = false;
  }

  //Resets player2 board
  for (let i = 0; i < player2.board.boardArray.length; i++) {
    player2.board.boardArray[i][1] = false;
    player2.board.boardArray[i][2] = false;
  }

  player1.board.shipsArray.length = 0;
  player2.board.shipsArray.length = 0;

  player1.renderBoard();
  player1.renderShipSelector();
  addListeners2();
}

//Adds event listeners and functions to select, move, rotate and place the ship
function addListeners2() {
  let selectedShip = '';

  if (selectionFailedShip === '') {
    selectedShip = '';
  } else if (selectionFailedShip !== '') {
    selectedShip = selectionFailedShip;
  }

  let orientation = 'horizontal';

  if (orientationOfFailedShip === 'vertical') {
    orientation = 'vertical';
  }

  const player1Board = document.getElementById('board1');

  //stops right-click menu - don't know how
  player1Board.addEventListener(
    'contextmenu',
    function (evt) {
      evt.preventDefault();
    },
    false
  );

  function rotate() {
    if (orientation === 'vertical') {
      orientation = 'horizontal';
    } else if (orientation === 'horizontal') {
      orientation = 'vertical';
    }
    clearShade();
  }

  function clearShade() {
    for (let i = 0; i < squareDivsArray.length; i++) {
      squareDivsArray[i].style.filter = 'brightness(1)';
    }
  }

  const ship1 = document.getElementById('ship1');
  ship1.addEventListener('click', selectShip1);

  function selectShip1() {
    //Checks if ship has already been placed
    if (ship1.style.backgroundColor !== 'rgb(99, 110, 118)') {
      ship1.style.backgroundColor = 'rgb(120, 177, 134)';
      selectedShip = 'carrier';
    }
  }

  const ship2 = document.getElementById('ship2');
  ship2.addEventListener('click', selectShip2);

  function selectShip2() {
    if (ship2.style.backgroundColor !== 'rgb(99, 110, 118)') {
      ship2.style.backgroundColor = 'rgb(120, 177, 134)';
      selectedShip = 'battleship';
    }
  }

  const ship3 = document.getElementById('ship3');
  ship3.addEventListener('click', selectShip3);

  function selectShip3() {
    if (ship3.style.backgroundColor !== 'rgb(99, 110, 118)') {
      ship3.style.backgroundColor = 'rgb(120, 177, 134)';
      selectedShip = 'cruiser';
    }
  }

  const ship4 = document.getElementById('ship4');
  ship4.addEventListener('click', selectShip4);

  function selectShip4() {
    if (ship4.style.backgroundColor !== 'rgb(99, 110, 118)') {
      ship4.style.backgroundColor = 'rgb(120, 177, 134)';
      selectedShip = 'submarine';
    }
  }

  const ship5 = document.getElementById('ship5');
  ship5.addEventListener('click', selectShip5);

  function selectShip5() {
    if (ship5.style.backgroundColor !== 'rgb(99, 110, 118)') {
      ship5.style.backgroundColor = 'rgb(120, 177, 134)';
      selectedShip = 'destroyer';
    }
  }

  //turns ship selector button darker
  function deselectShip(ship) {
    if (selectionFailedShip === '') {
      if (ship === 'carrier') {
        ship1.style.backgroundColor = 'rgb(99, 110, 118)';
      } else if (ship === 'battleship') {
        ship2.style.backgroundColor = 'rgb(99, 110, 118)';
      } else if (ship === 'cruiser') {
        ship3.style.backgroundColor = 'rgb(99, 110, 118)';
      } else if (ship === 'submarine') {
        ship4.style.backgroundColor = 'rgb(99, 110, 118)';
      } else if (ship === 'destroyer') {
        ship5.style.backgroundColor = 'rgb(99, 110, 118)';
      }
    }
  }

  for (let i = 0; i < squareDivsArray.length; i++) {
    squareDivsArray[i].addEventListener('mouseover', shade);
    squareDivsArray[i].addEventListener('mouseout', removeShade);
    squareDivsArray[i].addEventListener('click', selectLocation);

    squareDivsArray[i].addEventListener('contextmenu', rotate);
    squareDivsArray[i].addEventListener('contextmenu', shadeAfterRotate);

    function shade() {
      if (selectedShip === 'carrier') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          //if statement doesn't allow to go out of bounds
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
          if (i + 30 < 100) {
            squareDivsArray[i + 30].style.filter = 'brightness(0.8)';
          }
          if (i + 40 < 100) {
            squareDivsArray[i + 40].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          //if statement doesn't allow to go out of bounds
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 3) / 10)) {
            squareDivsArray[i + 3].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 4) / 10)) {
            squareDivsArray[i + 4].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'battleship') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
          if (i + 30 < 100) {
            squareDivsArray[i + 30].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 3) / 10)) {
            squareDivsArray[i + 3].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'cruiser') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'submarine') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'destroyer') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
        }
      }
    }

    function removeShade() {
      if (orientation === 'vertical') {
        squareDivsArray[i].style.filter = 'brightness(1)';
        if (i + 10 < 100) {
          squareDivsArray[i + 10].style.filter = 'brightness(1)';
        }
        if (i + 20 < 100) {
          squareDivsArray[i + 20].style.filter = 'brightness(1)';
        }
        if (i + 30 < 100) {
          squareDivsArray[i + 30].style.filter = 'brightness(1)';
        }
        if (i + 40 < 100) {
          squareDivsArray[i + 40].style.filter = 'brightness(1)';
        }
      } else if (orientation === 'horizontal') {
        squareDivsArray[i].style.filter = 'brightness(1)';
        squareDivsArray[i + 1].style.filter = 'brightness(1)';
        squareDivsArray[i + 2].style.filter = 'brightness(1)';
        squareDivsArray[i + 3].style.filter = 'brightness(1)';
        squareDivsArray[i + 4].style.filter = 'brightness(1)';
      }
    }

    function shadeAfterRotate() {
      if (selectedShip === 'carrier') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          //if statement doesn't allow to go out of bounds
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
          if (i + 30 < 100) {
            squareDivsArray[i + 30].style.filter = 'brightness(0.8)';
          }
          if (i + 40 < 100) {
            squareDivsArray[i + 40].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          //if statement doesn't allow to go out of bounds
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 3) / 10)) {
            squareDivsArray[i + 3].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 4) / 10)) {
            squareDivsArray[i + 4].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'battleship') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
          if (i + 30 < 100) {
            squareDivsArray[i + 30].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 3) / 10)) {
            squareDivsArray[i + 3].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'cruiser') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'submarine') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
          if (i + 20 < 100) {
            squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
          if (Math.floor(i / 10) === Math.floor((i + 2) / 10)) {
            squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          }
        }
      } else if (selectedShip === 'destroyer') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (i + 10 < 100) {
            squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          }
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          if (Math.floor(i / 10) === Math.floor((i + 1) / 10)) {
            squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          }
        }
      }
    }

    function selectLocation() {
      const coordinates = [];
      const indexNumber = i;
      const indexNumberString = indexNumber.toString();
      const indexNumberArray = indexNumberString.split('');

      //Turns squareDivsArray index into array of coordinates
      if (indexNumberArray.length === 1) {
        coordinates[0] = 0;
        coordinates[1] = parseInt(indexNumberArray[0]);
      } else if (indexNumberArray.length === 2) {
        coordinates[0] = parseInt(indexNumberArray[0]);
        coordinates[1] = parseInt(indexNumberArray[1]);
      }

      player1.board.placeShip(selectedShip, coordinates, orientation);
      deselectShip(selectedShip);
      player1.renderBoard();
      addListeners2();
      enableStartGameButton();

      function enableStartGameButton() {
        if (
          ship1.style.backgroundColor === 'rgb(99, 110, 118)' &&
          ship2.style.backgroundColor === 'rgb(99, 110, 118)' &&
          ship3.style.backgroundColor === 'rgb(99, 110, 118)' &&
          ship4.style.backgroundColor === 'rgb(99, 110, 118)' &&
          ship5.style.backgroundColor === 'rgb(99, 110, 118)'
        ) {
          const startButton = document.getElementById('s-button');
          startButton.addEventListener('click', startGame);
        }
      }
    }
  }
}

function createStartNewGameButton() {
  const placeButton = document.getElementById('place');
  placeButton.style.display = 'inline';
  placeButton.textContent = 'New Game';
}
