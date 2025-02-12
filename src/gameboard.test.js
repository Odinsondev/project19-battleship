import { createGameboard } from './gameboard';

//boardArray
test('array length', function () {
  expect(createGameboard().boardArray.length).toBe(100);
});

//findIndex
test('findindex', function () {
  expect(createGameboard().findIndex([6, 6])).toBe(66);
});

//placeShip
test('empty square', function () {
  expect(createGameboard().boardArray[0]).toStrictEqual([[0, 0], false, false]);
});

test('ship on square', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');

  expect(board.boardArray[0]).toStrictEqual([[0, 0], 'carrier', false]);
});

test('empty square after ship ends', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');

  expect(board.boardArray[5]).toStrictEqual([[0, 5], false, false]);
});

//shipArray
test('ship added to shipArray', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');

  expect(board.shipsArray[0].type).toBe('carrier');
});

//receiveAttack
test('record attack on board', function () {
  const board = createGameboard();
  board.receiveAttack([6, 6]);

  expect(board.boardArray[66][2]).toBe(true);
});

test('record hit on specific ship', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');
  board.receiveAttack([0, 1]);

  expect(board.shipsArray[0].timesHit).toBe(1);
});

//checkIfAllSunk
test('check if all sunk when no hits', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');

  expect(board.checkIfAllSunk()).toBe(false);
});

test('check if all sunk when 1 hit', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');
  board.receiveAttack([0, 1]);

  expect(board.checkIfAllSunk()).toBe(false);
});

test('check if all sunk when all sunk', function () {
  const board = createGameboard();
  board.placeShip('carrier', [0, 0], 'vertical');
  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);
  board.receiveAttack([0, 3]);
  board.receiveAttack([0, 4]);

  expect(board.checkIfAllSunk()).toBe(true);
});
