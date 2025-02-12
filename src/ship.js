export { createShip };

//functions
function createShip(type) {
  const ship = {};

  ship.type = type;
  ship.length = 0;

  if (type === 'carrier') {
    ship.length = 5;
  } else if (type === 'battleship') {
    ship.length = 4;
  } else if (type === 'cruiser') {
    ship.length = 3;
  } else if (type === 'submarine') {
    ship.length = 3;
  } else if (type === 'destroyer') {
    ship.length = 2;
  }

  ship.timesHit = 0;
  ship.isSunk = false;

  ship.hit = function () {
    this.timesHit += 1;
    this.checkIfSunk();
  };

  ship.checkIfSunk = function () {
    if (this.timesHit === this.length) {
      this.isSunk = true;
    }
  };

  return ship;
}
