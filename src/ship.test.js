import { createShip } from './ship';

//length
test('length', function () {
  expect(createShip('carrier').length).toBe(5);
});

//hits
test('hit - 1', function () {
  const ship = createShip('carrier');
  ship.hit();

  expect(ship.timesHit).toBe(1);
});

test('hit - 3', function () {
  const ship = createShip('carrier');
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.timesHit).toBe(3);
});

//sunk
test('sunk - false', function () {
  const ship = createShip('carrier');
  ship.hit();

  expect(ship.isSunk).toBe(false);
});

test('sunk - true', function () {
  const ship = createShip('carrier');
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk).toBe(true);
});
