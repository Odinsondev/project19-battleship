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
    let playerBoard = '';

    if (type === 'real') {
      playerBoard = player1Board;
    } else if (type === 'computer') {
      playerBoard = player2Board;
    }

    playerBoard.innerHTML = '';

    for (let i = 0; i < this.board.boardArray.length; i++) {
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
      if (
        player.board.boardArray[i][2] === true &&
        player.board.boardArray[i][1] === false
      ) {
        boardSquare.style.backgroundColor = 'rgb(64, 62, 147)';
        const dot = document.createElement('div');
        dot.classList.add('dot');
        boardSquare.appendChild(dot);
      } else if (
        player.board.boardArray[i][2] === true &&
        player.board.boardArray[i][1] !== false
      ) {
        boardSquare.style.backgroundColor = 'rgb(136, 150, 158)';
        const dot = document.createElement('div');
        dot.classList.add('dot2');
        boardSquare.appendChild(dot);
      }

      playerBoard.appendChild(boardSquare);
    }
  };

  const boardsWrapper = document.getElementById('boards-wrapper');

  player.renderShipSelector = function () {
    boardsWrapper.style.justifyContent = 'center';

    const shipImage1 = document.createElement('div');
    shipImage1.id = 'ship1';
    shipImage1.style.backgroundColor = 'rgb(136, 150, 158)';
    shipImage1.style.gridColumn = '2 / 7';
    shipImage1.style.gridRow = '2 / 3';
    player2Board.appendChild(shipImage1);

    const shipImage2 = document.createElement('div');
    shipImage2.id = 'ship2';
    shipImage2.style.backgroundColor = 'rgb(136, 150, 158)';
    shipImage2.style.gridColumn = '2 / 6';
    shipImage2.style.gridRow = '4 / 5';
    player2Board.appendChild(shipImage2);

    const shipImage3 = document.createElement('div');
    shipImage3.id = 'ship3';
    shipImage3.style.backgroundColor = 'rgb(136, 150, 158)';
    shipImage3.style.gridColumn = '2 / 5';
    shipImage3.style.gridRow = '6 / 7';
    player2Board.appendChild(shipImage3);

    const shipImage4 = document.createElement('div');
    shipImage4.id = 'ship4';
    shipImage4.style.backgroundColor = 'rgb(136, 150, 158)';
    shipImage4.style.gridColumn = '7 / 10';
    shipImage4.style.gridRow = '4 / 5';
    player2Board.appendChild(shipImage4);

    const shipImage5 = document.createElement('div');
    shipImage5.id = 'ship5';
    shipImage5.style.backgroundColor = 'rgb(136, 150, 158)';
    shipImage5.style.gridColumn = '8 / 10';
    shipImage5.style.gridRow = '2 / 3';
    player2Board.appendChild(shipImage5);

    const startButtonContainer = document.createElement('div');
    startButtonContainer.id = 's-button-container';
    startButtonContainer.style.gridColumn = '7 / 10';
    startButtonContainer.style.gridRow = '6 / 7';

    const startButton = document.createElement('button');
    startButton.id = 's-button';
    startButton.type = 'button';
    startButton.textContent = 'Start Game';
    startButtonContainer.appendChild(startButton);

    player2Board.appendChild(startButtonContainer);

    const instructionsBox = document.createElement('div');
    instructionsBox.id = 'instruction-box';
    instructionsBox.style.gridColumn = '2 / 11';
    instructionsBox.style.gridRow = '8 / 11';
    /*     instructionsBox.style.backgroundColor = 'rgb(155, 188, 206)';
     */
    const instructionsText = document.createElement('p');
    instructionsText.id = 'instructions-text';
    instructionsText.textContent = 'Click on a ship to select';
    instructionsText.style.color = 'rgb(209, 248, 239)';
    instructionsBox.appendChild(instructionsText);

    const instructionsText2 = document.createElement('p');
    instructionsText2.id = 'instructions-text-2';
    instructionsText2.textContent =
      'Left-click to place, right-click to rotate';
    instructionsText2.style.color = 'rgb(209, 248, 239)';

    instructionsBox.appendChild(instructionsText2);

    player2Board.appendChild(instructionsBox);
  };

  return player;
}
