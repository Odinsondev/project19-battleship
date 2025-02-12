export { createPlayer };

import { createGameboard } from './gameboard';

//functions
function createPlayer(type) {
  const player = {};

  player.type = type;
  player.board = createGameboard();

  return player;
}
