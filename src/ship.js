export { createShip };

//functions
function createShip(length) {
  const ship = {};

  ship.length = length;
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
