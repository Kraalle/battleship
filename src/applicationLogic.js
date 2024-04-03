let angle = 0;
let notDropped;
const width = 10;
let gameOver = false;
let playerTurn;
const allPlayerBlocks = document.querySelectorAll("#player div");

const containerColor = document.querySelector("#gamesboard-container");
containerColor.style.backgroundColor = "green";

function getShips() {
  return ships;
}

function flip(shipContainer) {
  const optionShips = Array.from(shipContainer.children);
  angle = angle === 0 ? 90 : 0;
  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)
  );
}

// drag player ships
let draggedShip;
function dragStart(e) {
  notDropped = false;
  draggedShip = e.target;
  console.log(draggedShip);
}

function dragOver(e, shipsArray) {
  e.preventDefault();
  const ship = shipsArray[draggedShip.id];
  highlightArea(e.target.id, ship);
}

function dropShip(e, shipsArray) {
  console.log("triggered");
  const startId = e.target.id;
  const ship = shipsArray[draggedShip.id];
  addShipPiece("player", ship, startId);
  if (!notDropped) {
    draggedShip.remove();
  }
}

//  Add highlight
function highlightArea(startIndex, ship) {
  const allBoardBlocks = document.querySelectorAll("#player div");
  let isHorizontal = angle === 0;

  const { shipBlocks, valid, notTaken } = getValidity(
    allBoardBlocks,
    isHorizontal,
    startIndex,
    ship
  );

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add("hover");
      setTimeout(() => shipBlock.classList.remove("hover"), 500);
    });
  }
}

function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`#${user} div`);
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === "player" ? angle === 0 : randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let startIndex = startId ? startId : randomStartIndex;

  const { shipBlocks, valid, notTaken } = getValidity(
    allBoardBlocks,
    isHorizontal,
    startIndex,
    ship
  );

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    if (user === "computer") addShipPiece(user, ship, startId);
    if (user === "player") notDropped = true;
  }
}

function getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {
  let validStart = isHorizontal
    ? startIndex <= width * width - ship.length
      ? startIndex
      : width * width - ship.length
    : startIndex <= width * width - width * ship.length
    ? startIndex
    : startIndex - ship.length * width + width;

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
    }
  }

  let valid;
  if (isHorizontal) {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid =
          shipBlocks[0].id % width !==
          width - (shipBlocks.length - (index + 1)))
    );
  } else {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid = shipBlocks[0].id < 90 + (width * index + 1))
    );
  }

  const notTaken = shipBlocks.every(
    (shipBlock) => !shipBlock.classList.contains("taken")
  );

  return { shipBlocks, valid, notTaken };
}

// Start Game
function startGame(optionContainer, infoDisplay, turnDisplay) {
  if (playerTurn === undefined) {
    if (optionContainer.children.length != 0) {
      infoDisplay.textContent = "Please place all your pieces first!";
    } else {
      const allBoardBlocks = document.querySelectorAll("#computer div");
      allBoardBlocks.forEach((block) => {
        block.addEventListener("click", (e) =>
          handleClick(e, infoDisplay, turnDisplay)
        );
      });

      playerTurn = true;
      turnDisplay.textContent = "Your Go!";
      infoDisplay.textContent = "The game has started!";
    }
  }
}

let playerHits = [];
let computerHits = [];
const playerSunkShips = [];
const computerSunkShips = [];

function handleClick(e, infoDisplay, turnDisplay) {
  if (!gameOver) {
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("boom");
      infoDisplay.textContent = "You hit the computers ship!";
      let classes = Array.from(e.target.classList);
      classes = classes.filter((className) => className !== "block");
      classes = classes.filter((className) => className !== "boom");
      classes = classes.filter((className) => className !== "taken");
      playerHits.push(...classes);
      checkScore("player", playerHits, playerSunkShips);
    }

    if (!e.target.classList.contains("taken")) {
      infoDisplay.textContent = "Nothing hit this time.";
      e.target.classList.add("empty");
    }

    playerTurn = false;
    const allBoardBlocks = document.querySelectorAll("#computer div");
    allBoardBlocks.forEach((block) => block.replaceWith(block.cloneNode(true)));
    setTimeout(computerGo(infoDisplay, infoDisplay), 3000);
  }
}

// define the computers go
function computerGo(infoDisplay, turnDisplay) {
  if (!gameOver) {
    turnDisplay.textContent = "Computers Go!";
    infoDisplay.textContent = "The computer is thinking...";

    setTimeout(() => {
      let randomGo = Math.floor(Math.random() * width * width);
      const allBoardBlocks = document.querySelectorAll("#player div");

      if (
        allPlayerBlocks[randomGo].classList.contains("taken") &&
        allBoardBlocks[randomGo].classList.contains("boom")
      ) {
        computerGo();
        return;
      } else if (
        allPlayerBlocks[randomGo].classList.contains("taken") &&
        !allBoardBlocks[randomGo].classList.contains("boom")
      ) {
        allBoardBlocks[randomGo].classList.add("boom");
        infoDisplay.textContent = "The computer hit your ship!";
        let classes = Array.from(allBoardBlocks[randomGo].classList);
        classes = classes.filter((className) => className !== "block");
        classes = classes.filter((className) => className !== "boom");
        classes = classes.filter((className) => className !== "taken");
        computerHits.push(...classes);
        checkScore("computer", computerHits, computerSunkShips);
      } else {
        infoDisplay.textContent = "Nothing hit this time.";
        allBoardBlocks[randomGo].classList.add("empty");
      }
    }, 3000);

    setTimeout(() => {
      playerTurn = true;
      turnDisplay.textContent = "Your Go!";
      infoDisplay.textContent = "Please take your go.";
      const allBoardBlocks = document.querySelectorAll("#computer div");
      allBoardBlocks.forEach((block) =>
        block.addEventListener("click", handleClick)
      );
    }, 6000);
  }
}

function checkScore(user, userHits, userSunkShips) {
  function checkShip(shipName, shipLength) {
    if (
      userHits.filter((storedShipName) => storedShipName === shipName)
        .length === shipLength
    ) {
      if (user === "player") {
        infoDisplay.textContent = `You sunk the computer's ${shipName}`;
        playerHits = userHits.filter(
          (storedShipName) => storedShipName !== shipName
        );
      }
      if (user === "computer") {
        infoDisplay.textContent = `The computer sunk your ${shipName}`;
        computerHits = userHits.filter(
          (storedShipName) => storedShipName !== shipName
        );
      }

      userSunkShips.push(shipName);
    }
  }

  checkShip("destroyer", 2);
  checkShip("submarine", 3);
  checkShip("cruiser", 3);
  checkShip("battleship", 4);
  checkShip("carrier", 5);

  console.log("playerHits", playerHits);
  console.log("playerSunkShips", playerSunkShips);

  if (playerSunkShips.length === 5) {
    infoDisplay.textContent = "You sunk all the computers ships. YOU WON!";
    gameOver = true;
  }

  if (computerSunkShips.length === 5) {
    infoDisplay.textContent = "The computer has sunk all your ships. You LOST!";
    gameOver = true;
  }
}

export {
  flip,
  dragStart,
  dragOver,
  dropShip,
  addShipPiece,
  getShips,
  startGame,
};
