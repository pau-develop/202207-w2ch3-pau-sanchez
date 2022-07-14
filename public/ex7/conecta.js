let playerTurn = 1;
const myGrid = []; // myGrid[[rows],[cols]]...
const divArray = [];
const gameDiv = document.getElementById("tablero");
const textBox = document.getElementById("text-h1");
console.log(gameDiv);
let buttons;
let gameOver = false;

const playerMove = () => {
  const msg = `Player ${playerTurn} turn...
  please choose a column... (from 0 to 6)`;
  console.log(msg);
  textBox.textContent = msg;
};

const generateGrid = () => {
  const rows = 6;
  const cols = 7;
  for (let i = 0; i < rows; i++) {
    if (i === 0) {
      const tempDiv = document.createElement("div");
      tempDiv.id = "outter-div";
      gameDiv.appendChild(tempDiv);
      for (let x = 0; x < cols; x++) {
        const tempDivInner = document.createElement("div");
        tempDivInner.id = "inner-div-buttons";
        tempDiv.appendChild(tempDivInner);
        const myButton = document.createElement("button");
        myButton.innerHTML = "INSERT TOKEN";
        tempDivInner.appendChild(myButton);
      }

      buttons = tempDiv.querySelectorAll("button");
      console.log(buttons);
    }
    myGrid.push("empty");
    myGrid[i] = [];
    divArray[i] = [];
    const tempDiv = document.createElement("div");
    tempDiv.id = "outter-div";
    gameDiv.appendChild(tempDiv);
    for (let x = 0; x < cols; x++) {
      const tempDivInner = document.createElement("div");
      tempDivInner.id = "inner-div";
      tempDiv.appendChild(tempDivInner);
      myGrid[i].push("empty");
      divArray[i].push(tempDivInner);
    }
  }
  console.log(`LET'S PLAY!`);
  textBox.textContent = `LET'S PLAY!`;
  console.table(myGrid);
  console.table(divArray);
  return playerMove();
};

const checkHorizontal = (tokenLocation) => {
  const myToken = playerTurn === 1 ? "X" : "O";
  const tokenRow = tokenLocation[0];
  let counter = 0;
  for (let i = 0; i < 7; i++) {
    if (myGrid[tokenRow][i] === myToken) counter++;
    else counter = 0;
    if (counter === 4) return true;
  }
  return false;
};

const checkVertical = (tokenLocation) => {
  const myToken = playerTurn === 1 ? "X" : "O";
  const tokenCol = tokenLocation[1];
  let counter = 0;
  for (let i = 0; i < 6; i++) {
    if (myGrid[i][tokenCol] === myToken) counter++;
    else counter = 0;
    if (counter === 4) return true;
  }
  return false;
};

const topLeft = () => {
  const myToken = playerTurn === 1 ? "X" : "O";
  let counter = 0;
  let rowLimit = 5;
  let y = 0;
  let x = 0;
  let iterations = 0;
  let z = 0;
  for (z; z < 6; z++) {
    y = z;
    for (let i = 0; i < 6; i++) {
      for (x; x < 7; x++) {
        if (myGrid[y][x] === myToken) counter++;
        if (counter === 4) return true;
        rowLimit = x >= 3 ? rowLimit-- : rowLimit;
        if (y < rowLimit) y++;
        else if (y >= rowLimit || x === 6) {
          iterations++;
          x = iterations;
          y = z;
          counter = 0;
          break;
        }
      }
      counter = 0;
    }
    x = 0;
    iterations = 0;
    counter = 0;
  }
  return 0;
};

const botLeft = () => {
  const myToken = playerTurn === 1 ? "X" : "O";
  let counter = 0;
  let rowLimit = 0;
  let y = 5;
  let x = 0;
  let iterations = 0;
  let z = 5;
  for (z; z > 0; z--) {
    y = z;
    for (let i = 0; i < 6; i++) {
      for (x; x < 7; x++) {
        if (myGrid[y][x] === myToken) counter++;
        if (counter === 4) return true;
        console.table(`row: ${y}`, `col: ${x}`);
        rowLimit = x >= 3 ? rowLimit-- : rowLimit;
        if (y > rowLimit) y--;
        else if (y >= rowLimit || x === 6) {
          iterations++;
          x = iterations;
          y = z;
          console.log("----------------");
          counter = 0;
          break;
        }
      }
      counter = 0;
    }
    x = 0;
    iterations = 0;
    counter = 0;
    console.table(myGrid);
  }
  return 0;
};

const checkDiagonal = () => {
  let hasWon = false;
  hasWon = topLeft();
  if (!hasWon) {
    hasWon = botLeft();
    if (hasWon) return true;
  } else return true;
  return false;
};

const endGame = () => {
  gameOver = true;
  console.log(`HURRAY! Player ${playerTurn} has won!
   Better luck next time Player ${playerTurn === 1 ? 2 : 1}!
   Press F5 to play again`);
  textBox.textContent = `HURRAY! Player ${playerTurn} has won!
  Better luck next time Player ${playerTurn === 1 ? 2 : 1}!
  Press F5 to play again`;
};

const changePlayerTurn = () => {
  playerTurn = playerTurn === 1 ? 2 : 1;
  return playerMove();
};

const checkForWinner = (tokenLocation) => {
  let hasWon = false;
  hasWon = checkHorizontal(tokenLocation);
  if (!hasWon) {
    hasWon = checkVertical(tokenLocation);
    if (!hasWon) {
      hasWon = checkDiagonal();
    }
  }
  if (hasWon) endGame();
  else changePlayerTurn();
};

const checkSlots = (col) => {
  let madeMove = false;
  let tokenLocation;
  let str;
  let color;
  if (playerTurn === 1) {
    str = "X";
    color = "red";
  } else {
    str = "O";
    color = "yellow";
  }

  for (let i = myGrid.length - 1; i >= 0; i--) {
    if (myGrid[i][col] === "empty") {
      myGrid[i][col] = str;
      divArray[i][col].style.backgroundColor = `${color}`;
      console.table(myGrid);
      madeMove = true;
      tokenLocation = [i, col];
      console.log(
        `Player ${playerTurn} has inserted a token in column ${col} row ${i}`
      );
      textBox.textContent = `Player ${playerTurn} has inserted a token in column ${col} row ${i}`;
      break;
    } else {
      console.log(`this column is already filled... ಠ_ಠ`);
      textBox.textContent = `this column is already filled... ಠ_ಠ`;
    }
  }
  return madeMove ? checkForWinner(tokenLocation) : playerMove();
};

generateGrid();

for (let i = 0; i < buttons.length; i++) {
  if (!gameOver) {
    buttons[i].addEventListener("click", function () {
      return checkSlots(i);
    });
  }
}
