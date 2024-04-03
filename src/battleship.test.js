// import Ship from "./ships";

// const Ship = require("./ships.js");

// describe("Ship", () => {
//   test("ship is initialized with correct length and hit count", () => {
//     const ship = new Ship("destroyer", 3);
//     expect(ship.length).toBe(3);
//     expect(ship.hits).toBe(0);
//   });

//   test("hit() increments the hit count", () => {
//     const ship = new Ship("destroyer", 3);
//     ship.hit();
//     expect(ship.hits).toBe(1);
//   });

//   test("isSunk() returns false when ship has not been sunk", () => {
//     const ship = new Ship("destroyer", 3);
//     expect(ship.isSunk()).toBe(false);
//     ship.hit();
//     expect(ship.isSunk()).toBe(false);
//   });

//   test("isSunk() return true when ship has been sunk", () => {
//     const ship = new Ship("destroyer", 3);
//     ship.hit();
//     ship.hit();
//     ship.hit();
//     expect(ship.isSunk()).toBe(true);
//   });

//   test("hit() does not increment hit count after ship is sunk", () => {
//     const ship = new Ship("destroyer", 3);
//     ship.hit();
//     ship.hit();
//     ship.hit();
//     ship.hit();
//     expect(ship.hits).toBe(3);
//   });
// });

// const { Ship } = require("./ships.js");
// const { Gameboard } = require("./gameboard.js");

// describe("Gameboard", () => {
//   let gameboard;
//   let ship;

//   beforeEach(() => {
//     gameboard = new Gameboard();
//     ship = new Ship("Ship", 3);
//   });

//   test("placeShip() places a ship on the gameboard", () => {
//     gameboard.placeShip(ship, 0, 0, true);
//     expect(gameboard.grid[0][0]).toBe(ship);
//     expect(gameboard.grid[1][0]).toBe(ship);
//     expect(gameboard.grid[2][0]).toBe(ship);
//   });

//   test("placeShip() throws error when ship placement out of bounds", () => {
//     expect(() => gameboard.placeShip(ship, 8, 9, true)).toThrow(
//       "Ship placement out of bounds."
//     );
//   });

//   test("placeShip() throws error when ship placement overlaps with another ship", () => {
//     gameboard.placeShip(ship, 2, 3, false);
//     const newShip = new Ship("New Ship", 2);
//     expect(() => gameboard.placeShip(newShip, 2, 3, true)).toThrow(
//       "Another ship is already placed at these coordinates."
//     );
//   });

//   test("receiveAttack() records missed attacks", () => {
//     gameboard.receiveAttack(0, 0);
//     expect(gameboard.missedAttacks).toContainEqual([0, 0]);
//   });

//   test("receiveAttack() calls hit() on the ship when attacked", () => {
//     gameboard.placeShip(ship, 0, 0, true);
//     gameboard.receiveAttack(0, 0);
//     expect(ship.hits).toBe(1);
//   });

//   test("allShipsSunk() returns false when not all ships are sunk", () => {
//     gameboard.placeShip(ship, 0, 0, true);
//     expect(gameboard.allShipsSunk()).toBe(false);
//   });

//   test("allShipsSunk() returns true when all ships are sunk", () => {
//     gameboard.placeShip(ship, 0, 0, true);
//     gameboard.receiveAttack(0, 0);
//     gameboard.receiveAttack(1, 0);
//     gameboard.receiveAttack(2, 0);
//     expect(gameboard.allShipsSunk()).toBe(true);
//   });
// });

// const { Player } = require("./player");
// const { Gameboard } = require("./gameboard");

// describe("Player", () => {
//   test("attack() returns false if coordinates have already been attacked", () => {
//     const playerGameboard = new Gameboard();
//     const enemyGameboard = new Gameboard();
//     const player = new Player(playerGameboard);
//     enemyGameboard.receiveAttack(0, 0); // Marking (0, 0) as attacked
//     const result = player.attack(enemyGameboard, 0, 0);
//     expect(result).toBe("miss");
//   });

//   test("attack() returns correct result if coordinates have not been attacked", () => {
//     const playerGameboard = new Gameboard();
//     const enemyGameboard = new Gameboard();
//     const player = new Player(playerGameboard);
//     const result = player.attack(enemyGameboard, 0, 0);
//     expect(result).not.toBe(false); // Expecting a result other than false since coordinates have not been attacked
//   });
// });

// const { Computer } = require("./computer.js");
// const { Gameboard } = require("./gameboard.js");

// describe("Computer", () => {
//   let computer;
//   let enemyGameboard;

//   beforeEach(() => {
//     enemyGameboard = new Gameboard();
//     computer = new Computer();
//   });

//   test("makeRandomAttack() makes a valid attack", () => {
//     // Call the makeRandomAttack method with the initialized enemyGameboard
//     const result = computer.makeRandomAttack(enemyGameboard);

//     // Add your assertions here
//   });
// });
