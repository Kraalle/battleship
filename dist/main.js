/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/applicationLogic.js":
/*!*********************************!*\
  !*** ./src/applicationLogic.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addShipPiece: () => (/* binding */ addShipPiece),\n/* harmony export */   dragOver: () => (/* binding */ dragOver),\n/* harmony export */   dragStart: () => (/* binding */ dragStart),\n/* harmony export */   dropShip: () => (/* binding */ dropShip),\n/* harmony export */   flip: () => (/* binding */ flip),\n/* harmony export */   getShips: () => (/* binding */ getShips),\n/* harmony export */   startGame: () => (/* binding */ startGame)\n/* harmony export */ });\nlet angle = 0;\nlet notDropped;\nconst width = 10;\nlet gameOver = false;\nlet playerTurn;\nconst allPlayerBlocks = document.querySelectorAll(\"#player div\");\n\nconst containerColor = document.querySelector(\"#gamesboard-container\");\ncontainerColor.style.backgroundColor = \"green\";\n\nfunction getShips() {\n  return ships;\n}\n\nfunction flip(shipContainer) {\n  const optionShips = Array.from(shipContainer.children);\n  angle = angle === 0 ? 90 : 0;\n  optionShips.forEach(\n    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)\n  );\n}\n\n// drag player ships\nlet draggedShip;\nfunction dragStart(e) {\n  notDropped = false;\n  draggedShip = e.target;\n  console.log(draggedShip);\n}\n\nfunction dragOver(e, shipsArray) {\n  e.preventDefault();\n  const ship = shipsArray[draggedShip.id];\n  highlightArea(e.target.id, ship);\n}\n\nfunction dropShip(e, shipsArray) {\n  console.log(\"triggered\");\n  const startId = e.target.id;\n  const ship = shipsArray[draggedShip.id];\n  addShipPiece(\"player\", ship, startId);\n  if (!notDropped) {\n    draggedShip.remove();\n  }\n}\n\n//  Add highlight\nfunction highlightArea(startIndex, ship) {\n  const allBoardBlocks = document.querySelectorAll(\"#player div\");\n  let isHorizontal = angle === 0;\n\n  const { shipBlocks, valid, notTaken } = getValidity(\n    allBoardBlocks,\n    isHorizontal,\n    startIndex,\n    ship\n  );\n\n  if (valid && notTaken) {\n    shipBlocks.forEach((shipBlock) => {\n      shipBlock.classList.add(\"hover\");\n      setTimeout(() => shipBlock.classList.remove(\"hover\"), 500);\n    });\n  }\n}\n\nfunction addShipPiece(user, ship, startId) {\n  const allBoardBlocks = document.querySelectorAll(`#${user} div`);\n  let randomBoolean = Math.random() < 0.5;\n  let isHorizontal = user === \"player\" ? angle === 0 : randomBoolean;\n  let randomStartIndex = Math.floor(Math.random() * width * width);\n\n  let startIndex = startId ? startId : randomStartIndex;\n\n  const { shipBlocks, valid, notTaken } = getValidity(\n    allBoardBlocks,\n    isHorizontal,\n    startIndex,\n    ship\n  );\n\n  if (valid && notTaken) {\n    shipBlocks.forEach((shipBlock) => {\n      shipBlock.classList.add(ship.name);\n      shipBlock.classList.add(\"taken\");\n    });\n  } else {\n    if (user === \"computer\") addShipPiece(user, ship, startId);\n    if (user === \"player\") notDropped = true;\n  }\n}\n\nfunction getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {\n  let validStart = isHorizontal\n    ? startIndex <= width * width - ship.length\n      ? startIndex\n      : width * width - ship.length\n    : startIndex <= width * width - width * ship.length\n    ? startIndex\n    : startIndex - ship.length * width + width;\n\n  let shipBlocks = [];\n\n  for (let i = 0; i < ship.length; i++) {\n    if (isHorizontal) {\n      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);\n    } else {\n      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);\n    }\n  }\n\n  let valid;\n  if (isHorizontal) {\n    shipBlocks.every(\n      (_shipBlock, index) =>\n        (valid =\n          shipBlocks[0].id % width !==\n          width - (shipBlocks.length - (index + 1)))\n    );\n  } else {\n    shipBlocks.every(\n      (_shipBlock, index) =>\n        (valid = shipBlocks[0].id < 90 + (width * index + 1))\n    );\n  }\n\n  const notTaken = shipBlocks.every(\n    (shipBlock) => !shipBlock.classList.contains(\"taken\")\n  );\n\n  return { shipBlocks, valid, notTaken };\n}\n\n// Start Game\nfunction startGame(optionContainer, infoDisplay, turnDisplay) {\n  if (playerTurn === undefined) {\n    if (optionContainer.children.length != 0) {\n      infoDisplay.textContent = \"Please place all your pieces first!\";\n    } else {\n      const allBoardBlocks = document.querySelectorAll(\"#computer div\");\n      allBoardBlocks.forEach((block) => {\n        block.addEventListener(\"click\", (e) =>\n          handleClick(e, infoDisplay, turnDisplay)\n        );\n      });\n\n      playerTurn = true;\n      turnDisplay.textContent = \"Your Go!\";\n      infoDisplay.textContent = \"The game has started!\";\n    }\n  }\n}\n\nlet playerHits = [];\nlet computerHits = [];\nconst playerSunkShips = [];\nconst computerSunkShips = [];\n\nfunction handleClick(e, infoDisplay, turnDisplay) {\n  if (!gameOver) {\n    if (e.target.classList.contains(\"taken\")) {\n      e.target.classList.add(\"boom\");\n      infoDisplay.textContent = \"You hit the computers ship!\";\n      let classes = Array.from(e.target.classList);\n      classes = classes.filter((className) => className !== \"block\");\n      classes = classes.filter((className) => className !== \"boom\");\n      classes = classes.filter((className) => className !== \"taken\");\n      playerHits.push(...classes);\n      checkScore(\"player\", playerHits, playerSunkShips);\n    }\n\n    if (!e.target.classList.contains(\"taken\")) {\n      infoDisplay.textContent = \"Nothing hit this time.\";\n      e.target.classList.add(\"empty\");\n    }\n\n    playerTurn = false;\n    const allBoardBlocks = document.querySelectorAll(\"#computer div\");\n    allBoardBlocks.forEach((block) => block.replaceWith(block.cloneNode(true)));\n    setTimeout(computerGo(infoDisplay, infoDisplay), 3000);\n  }\n}\n\n// define the computers go\nfunction computerGo(infoDisplay, turnDisplay) {\n  if (!gameOver) {\n    turnDisplay.textContent = \"Computers Go!\";\n    infoDisplay.textContent = \"The computer is thinking...\";\n\n    setTimeout(() => {\n      let randomGo = Math.floor(Math.random() * width * width);\n      const allBoardBlocks = document.querySelectorAll(\"#player div\");\n\n      if (\n        allPlayerBlocks[randomGo].classList.contains(\"taken\") &&\n        allBoardBlocks[randomGo].classList.contains(\"boom\")\n      ) {\n        computerGo();\n        return;\n      } else if (\n        allPlayerBlocks[randomGo].classList.contains(\"taken\") &&\n        !allBoardBlocks[randomGo].classList.contains(\"boom\")\n      ) {\n        allBoardBlocks[randomGo].classList.add(\"boom\");\n        infoDisplay.textContent = \"The computer hit your ship!\";\n        let classes = Array.from(allBoardBlocks[randomGo].classList);\n        classes = classes.filter((className) => className !== \"block\");\n        classes = classes.filter((className) => className !== \"boom\");\n        classes = classes.filter((className) => className !== \"taken\");\n        computerHits.push(...classes);\n        checkScore(\"computer\", computerHits, computerSunkShips);\n      } else {\n        infoDisplay.textContent = \"Nothing hit this time.\";\n        allBoardBlocks[randomGo].classList.add(\"empty\");\n      }\n    }, 3000);\n\n    setTimeout(() => {\n      playerTurn = true;\n      turnDisplay.textContent = \"Your Go!\";\n      infoDisplay.textContent = \"Please take your go.\";\n      const allBoardBlocks = document.querySelectorAll(\"#computer div\");\n      allBoardBlocks.forEach((block) =>\n        block.addEventListener(\"click\", handleClick)\n      );\n    }, 6000);\n  }\n}\n\nfunction checkScore(user, userHits, userSunkShips) {\n  function checkShip(shipName, shipLength) {\n    if (\n      userHits.filter((storedShipName) => storedShipName === shipName)\n        .length === shipLength\n    ) {\n      if (user === \"player\") {\n        infoDisplay.textContent = `You sunk the computer's ${shipName}`;\n        playerHits = userHits.filter(\n          (storedShipName) => storedShipName !== shipName\n        );\n      }\n      if (user === \"computer\") {\n        infoDisplay.textContent = `The computer sunk your ${shipName}`;\n        computerHits = userHits.filter(\n          (storedShipName) => storedShipName !== shipName\n        );\n      }\n\n      userSunkShips.push(shipName);\n    }\n  }\n\n  checkShip(\"destroyer\", 2);\n  checkShip(\"submarine\", 3);\n  checkShip(\"cruiser\", 3);\n  checkShip(\"battleship\", 4);\n  checkShip(\"carrier\", 5);\n\n  console.log(\"playerHits\", playerHits);\n  console.log(\"playerSunkShips\", playerSunkShips);\n\n  if (playerSunkShips.length === 5) {\n    infoDisplay.textContent = \"You sunk all the computers ships. YOU WON!\";\n    gameOver = true;\n  }\n\n  if (computerSunkShips.length === 5) {\n    infoDisplay.textContent = \"The computer has sunk all your ships. You LOST!\";\n    gameOver = true;\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/applicationLogic.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createBoard: () => (/* binding */ createBoard)\n/* harmony export */ });\nconst width = 10;\n\nfunction createBoard(color, user, gameboard) {\n  const gameBoardContainer = document.createElement(\"div\");\n  gameBoardContainer.classList.add(\"game-board\");\n  gameBoardContainer.style.backgroundColor = color;\n  gameBoardContainer.id = user;\n\n  for (let i = 0; i < width * width; i++) {\n    const block = document.createElement(\"div\");\n    block.classList.add(\"block\");\n    block.id = i;\n    gameBoardContainer.append(block);\n  }\n\n  gameboard.append(gameBoardContainer);\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _applicationLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applicationLogic */ \"./src/applicationLogic.js\");\n\n\n\n\nconst destroyer = new _ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"destroyer\", 2);\nconst submarine = new _ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"submarine\", 3);\nconst cruiser = new _ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"cruiser\", 3);\nconst battleship = new _ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"battleship\", 4);\nconst carrier = new _ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"carrier\", 5);\nconst ships = [destroyer, submarine, cruiser, battleship, carrier];\n\n// Query Selectors for DOM\nconst gameBoardContainer = document.querySelector(\"#gamesboard-container\");\nconst optionContainer = document.querySelector(\".option-container\");\nconst flipButton = document.querySelector(\"#flip-button\");\nconst startButton = document.querySelector(\"#start-button\");\nconst infoDisplay = document.querySelector(\"#info\");\nconst turnDisplay = document.querySelector(\"#turn-display\");\n\n(0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createBoard)(\"silver\", \"player\", gameBoardContainer);\n(0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createBoard)(\"gray\", \"computer\", gameBoardContainer);\n\n// allow players to flip ship using flip button\nflipButton.addEventListener(\"click\", () => (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_2__.flip)(optionContainer));\n\n// drag player ships\nconst optionShips = Array.from(optionContainer.children);\noptionShips.forEach((optionShip) =>\n  optionShip.addEventListener(\"dragstart\", _applicationLogic__WEBPACK_IMPORTED_MODULE_2__.dragStart)\n);\n\nships.forEach((ship) => (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_2__.addShipPiece)(\"computer\", ship));\n\nconst allPlayerBlocks = document.querySelectorAll(\"#player div\");\nallPlayerBlocks.forEach((playerBlock) => {\n  playerBlock.addEventListener(\"dragover\", (e) => (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_2__.dragOver)(e, ships));\n  playerBlock.addEventListener(\"drop\", (e) => (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_2__.dropShip)(e, ships));\n});\n\nstartButton.addEventListener(\"click\", () =>\n  (0,_applicationLogic__WEBPACK_IMPORTED_MODULE_2__.startGame)(optionContainer, infoDisplay, turnDisplay)\n);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(name, length) {\n    this.name = name;\n    this.length = length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ships.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;