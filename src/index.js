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
board.placeShip([0, 0], 5, 'vertical');
console.log(board.boardArray);
