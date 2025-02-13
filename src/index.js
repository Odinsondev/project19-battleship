import './normalize.css';
import './style.css';

/* import { createShip } from './ship';
import { createGameboard } from './gameboard'; */

import { createPlayer } from './player';

//initialize
const player1 = createPlayer('real');
const player2 = createPlayer('computer');

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

console.log('rendering 1st boards');
player1.renderBoard();
player2.renderBoard();

//cache DOM
const squareDivsArray = document.getElementsByClassName('board-square');
//bind events

//functions
function darkenSquare() {
  console.log('running darken');
  for (let i = 0; i < squareDivsArray.length; i++) {
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
      playerBeingAttacked.board.receiveAttack(coordinates);

      playerBeingAttacked.renderBoard();
      darkenSquare();
    }
  }
}
darkenSquare();

/* function attack() {
  for (let i = 0; i < squareDivsArray.length; i++) {
    squareDivsArray[i].addEventListener('click', passAttack);

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
      playerBeingAttacked.board.receiveAttack(coordinates);

      playerBeingAttacked.renderBoard();
      darkenSquare();
    }
  }
} */
/* attack(); */
