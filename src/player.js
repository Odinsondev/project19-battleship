export { createPlayer };

import { createGameboard } from './gameboard';

//cache DOM
//add logic to render the correct board
const player1Board = document.getElementById('board1');
const player2Board = document.getElementById('board2');

//functions
function createPlayer(type) {
  const player = {};

  player.type = type;
  player.board = createGameboard();

  //can shorten this function
  player.renderBoard = function () {
    console.log('running renderBoard');
    console.log(type);

    let playerBoard = '';

    if (type === 'real') {
      playerBoard = player1Board;
    } else if (type === 'computer') {
      playerBoard = player2Board;
    }

    playerBoard.innerHTML = '';

    for (let i = 0; i < this.board.boardArray.length; i++) {
      console.log('running loop');
      const boardSquare = document.createElement('div');
      boardSquare.classList.add('board-square');

      if (
        player.board.boardArray[i][1] === false &&
        player.board.boardArray[i][2] === false
      ) {
        boardSquare.style.backgroundColor = 'rgb(64, 62, 147)';
      } else if (
        player.board.boardArray[i][1] !== false &&
        player.board.boardArray[i][2] === false
      ) {
        boardSquare.style.backgroundColor = 'rgb(136, 150, 158)';
      }

      //marks shot squares
      //add code to have different colours for shot ships and shot water
      if (player.board.boardArray[i][2] === true) {
        boardSquare.style.backgroundColor = 'black';
      }

      playerBoard.appendChild(boardSquare);
    }
  };

  return player;
}

function test() {}
