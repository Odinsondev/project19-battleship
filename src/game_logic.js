export { startGame, addListeners };

import { createPlayer } from './player';

//initialize

//cache DOM
const player1 = createPlayer('real');
const player2 = createPlayer('computer');
const squareDivsArray = document.getElementsByClassName('board-square');
let turn = 'player1';

const playerText = document.getElementById('instructions');

//bind events

//functions
function startGame() {
  player1.board.placeShip('carrier', [0, 0], 'vertical');
  player1.board.placeShip('battleship', [2, 4], 'horizontal');
  player1.board.placeShip('cruiser', [4, 4], 'vertical');
  player1.board.placeShip('submarine', [5, 6], 'horizontal');
  player1.board.placeShip('destroyer', [6, 1], 'vertical');

  player2.board.placeShip('carrier', [4, 1], 'vertical');
  player2.board.placeShip('battleship', [1, 3], 'horizontal');
  player2.board.placeShip('cruiser', [4, 3], 'vertical');
  player2.board.placeShip('submarine', [4, 6], 'horizontal');
  player2.board.placeShip('destroyer', [6, 5], 'vertical');

  player1.renderBoard();
  player2.renderBoard();
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
        console.log(attackedSquareIndex);
        if (player2.board.boardArray[attackedSquareIndex][2] === true) {
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
  console.log('run2');

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
  console.log(attackedSquareIndex);
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
