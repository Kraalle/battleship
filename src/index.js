import Ship from "./ships";
import { createBoard } from "./gameboard";
import {
  flip,
  dragOver,
  dragStart,
  dropShip,
  addShipPiece,
  startGame,
} from "./applicationLogic";

const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const cruiser = new Ship("cruiser", 3);
const battleship = new Ship("battleship", 4);
const carrier = new Ship("carrier", 5);
const ships = [destroyer, submarine, cruiser, battleship, carrier];

// Query Selectors for DOM
const gameBoardContainer = document.querySelector("#gamesboard-container");
const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");
const startButton = document.querySelector("#start-button");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");

createBoard("silver", "player", gameBoardContainer);
createBoard("gray", "computer", gameBoardContainer);

// allow players to flip ship using flip button
flipButton.addEventListener("click", () => flip(optionContainer));

// drag player ships
const optionShips = Array.from(optionContainer.children);
optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart)
);

ships.forEach((ship) => addShipPiece("computer", ship));

const allPlayerBlocks = document.querySelectorAll("#player div");
allPlayerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", (e) => dragOver(e, ships));
  playerBlock.addEventListener("drop", (e) => dropShip(e, ships));
});

startButton.addEventListener("click", () =>
  startGame(optionContainer, infoDisplay, turnDisplay)
);
