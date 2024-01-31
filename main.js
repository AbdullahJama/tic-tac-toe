const x_class = "x";
const circle_class = "circle";
const cellElement = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.getElementById("board");
let circleTurn;
const winningTextMessageElement = document.querySelector(
  "[data-winning-message-text]"
);

const reStartButton = document.getElementById("restartButton");
const optionX = document.getElementById("optionx");
const optionO = document.getElementById("optiono");
const submitBtn = document.getElementById("submitButton");
const selection_X = document.getElementById("xOption");
const selection_O = document.getElementById("oOption");
const startForm = document.getElementById("startForm");

optionX.addEventListener("click", optionHandler);
optionO.addEventListener("click", optionHandler);
submitBtn.addEventListener("click", submitHandler);
reStartButton.addEventListener("click", startGame);

function optionHandler(e) {
  optionX.classList.remove("optionButtonStyle2");
  optionX.classList.add("optionButtonStyle");
  optionO.classList.remove("optionButtonStyle2");
  optionO.classList.add("optionButtonStyle");
  e.currentTarget.classList.remove("optionButtonStyle");
  e.currentTarget.classList.add("optionButtonStyle2");
  //console.log("it works");
}

function submitHandler(e) {
  e.preventDefault();

  if (selection_X.checked || selection_O.checked) {
    startForm.classList.add("hide");
    board.classList.add("show");
  } else {
    alert("Please select one option.");
  }
}

startGame();

function startGame() {
  circleTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();

  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningTextMessageElement.innerText = "Tie!";
  } else {
    winningTextMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
