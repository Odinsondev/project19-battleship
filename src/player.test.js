import { createPlayer } from './player';

test('player type', function () {
  expect(createPlayer('real').type).toBe('real');
});

test('player board', function () {
  expect(createPlayer('real').board.boardArray.length).toBe(100);
});
