import { createGameboard } from './gameboard';

//boardArray
test('array length', function () {
  expect(createGameboard().boardArray.length).toBe(100);
});

test('findindex', function () {
  expect(createGameboard().findIndex([6, 6])).toBe(66);
});

test('empty square', function () {
  expect(createGameboard().boardArray[0]).toStrictEqual([[0, 0], false]);
});

test('full square', function () {
  const board = createGameboard();
  board.placeShip([0, 0], 5, 'vertical');

  expect(board.boardArray[0]).toStrictEqual([[0, 0], true]);
});

test('empty square after ship ends', function () {
  const board = createGameboard();
  board.placeShip([0, 0], 5, 'vertical');

  expect(board.boardArray[5]).toStrictEqual([[0, 5], false]);
});
