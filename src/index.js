import './normalize.css';
import './style.css';
//import other stylesheets

/* import functionName from './javascriptFile'; */
import { createShip } from './ship';
import { createGameboard } from './gameboard';

/* import pictureName from './imagedDirectory/imageName'; */

//initialize

//cache DOM

//bind events

//functions

const board = createGameboard();
board.placeShip('carrier', [0, 0], 'vertical');
board.receiveAttack([0, 1]);
board.receiveAttack([0, 2]);
board.receiveAttack([0, 3]);
board.receiveAttack([0, 4]);
board.receiveAttack([0, 5]);
console.log(board.boardArray);
