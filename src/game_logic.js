export { startGame, addListeners, startGame2 };

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
  player1.renderBoard();
  player1.renderShipSelector();
  addListeners2();
}

function addListeners2() {
  let selectedShip = '';
  let orientation = 'vertical';

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
    ship1.style.backgroundColor = 'rgb(120, 177, 134)';
    ship2.style.backgroundColor = 'rgb(136, 150, 158)';
    ship3.style.backgroundColor = 'rgb(136, 150, 158)';
    ship4.style.backgroundColor = 'rgb(136, 150, 158)';
    ship5.style.backgroundColor = 'rgb(136, 150, 158)';
    selectedShip = 'carrier';
  }

  const ship2 = document.getElementById('ship2');
  ship2.addEventListener('click', selectShip2);

  function selectShip2() {
    ship1.style.backgroundColor = 'rgb(136, 150, 158)';
    ship2.style.backgroundColor = 'rgb(120, 177, 134)';
    ship3.style.backgroundColor = 'rgb(136, 150, 158)';
    ship4.style.backgroundColor = 'rgb(136, 150, 158)';
    ship5.style.backgroundColor = 'rgb(136, 150, 158)';
    selectedShip = 'battleship';
  }

  const ship3 = document.getElementById('ship3');
  ship3.addEventListener('click', selectShip3);

  function selectShip3() {
    ship1.style.backgroundColor = 'rgb(136, 150, 158)';
    ship2.style.backgroundColor = 'rgb(136, 150, 158)';
    ship3.style.backgroundColor = 'rgb(120, 177, 134)';
    ship4.style.backgroundColor = 'rgb(136, 150, 158)';
    ship5.style.backgroundColor = 'rgb(136, 150, 158)';
    selectedShip = 'cruiser';
  }

  const ship4 = document.getElementById('ship4');
  ship4.addEventListener('click', selectShip4);

  function selectShip4() {
    ship1.style.backgroundColor = 'rgb(136, 150, 158)';
    ship2.style.backgroundColor = 'rgb(136, 150, 158)';
    ship3.style.backgroundColor = 'rgb(136, 150, 158)';
    ship4.style.backgroundColor = 'rgb(120, 177, 134)';
    ship5.style.backgroundColor = 'rgb(136, 150, 158)';
    selectedShip = 'submarine';
  }

  const ship5 = document.getElementById('ship5');
  ship5.addEventListener('click', selectShip5);

  function selectShip5() {
    ship1.style.backgroundColor = 'rgb(136, 150, 158)';
    ship2.style.backgroundColor = 'rgb(136, 150, 158)';
    ship3.style.backgroundColor = 'rgb(136, 150, 158)';
    ship4.style.backgroundColor = 'rgb(136, 150, 158)';
    ship5.style.backgroundColor = 'rgb(120, 177, 134)';
    selectedShip = 'destroyer';
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
          squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 30].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 40].style.filter = 'brightness(0.8)';
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 3].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 4].style.filter = 'brightness(0.8)';
        }
      } else if (selectedShip === 'battleship') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 30].style.filter = 'brightness(0.8)';
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 3].style.filter = 'brightness(0.8)';
        }
      } else if (selectedShip === 'cruiser') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
        }
      } else if (selectedShip === 'submarine') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 20].style.filter = 'brightness(0.8)';
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 2].style.filter = 'brightness(0.8)';
        }
      } else if (selectedShip === 'destroyer') {
        if (orientation === 'vertical') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 10].style.filter = 'brightness(0.8)';
        } else if (orientation === 'horizontal') {
          squareDivsArray[i].style.filter = 'brightness(0.8)';
          squareDivsArray[i + 1].style.filter = 'brightness(0.8)';
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
      player1.renderBoard();
      addListeners2();
    }
  }
}
