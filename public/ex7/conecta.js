//we will start with a console version

let playerTurn = 1; //player 1 and player 2...
let myGrid = []; // myGrid[[rows],[cols]]...
let divArray = [];
let gameDiv = document.getElementById("tablero");
let textBox = document.getElementById("text-h1");
console.log(gameDiv);
let buttons; //we will fill the array with buttons later below;
let gameOver = false;

//I followed along with this resources to figure out how to make the grid:
//https://www.youtube.com/watch?v=OTNpiLUSiB4&t=195s

//lets create the grid!
const generateGrid = () => {
  const rows = 6;
  const cols = 7;
  for (let i = 0; i < rows; i++) {
    //extra div to hold the buttons to insert token
    if (i === 0) {
      tempDiv = document.createElement("div"); //the div for each row
      tempDiv.id = "outter-div";
      gameDiv.appendChild(tempDiv);
      for (let i = 0; i < cols; i++) {
        let tempDivInner = document.createElement("div"); //the div for each col (appended inside tempDiv)
        tempDivInner.id = "inner-div-buttons";
        tempDiv.appendChild(tempDivInner);
        let myButton = document.createElement("button");
        myButton.innerHTML = "INSERT TOKEN";
        tempDivInner.appendChild(myButton);
      }
      //get those buttons in an array so we may push them later on
      buttons = tempDiv.querySelectorAll("button");
      console.log(buttons);
    }
    myGrid.push("empty");
    myGrid[i] = new Array();
    divArray[i] = new Array(); // one div for each row and inside each div one div for each column
    tempDiv = document.createElement("div"); //the div for each row
    tempDiv.id = "outter-div";
    gameDiv.appendChild(tempDiv);
    for (let x = 0; x < cols; x++) {
      let tempDivInner = document.createElement("div"); //the div for each col (appended inside tempDiv)
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
  return playerMove(); //after creating  the grid let the player make his move...
};

//now let the player choose a column to insert the token
//'X' for player 1 and 'O' for player 2
const playerMove = () => {
  let msg = `Player ${playerTurn} turn...
  please choose a column... (from 0 to 6)`;
  console.log(msg);
  textBox.textContent = msg;
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
  let freeSlot = true;
  //we iterate backwards (from row 5 to 0)
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

const checkForWinner = (tokenLocation) => {
  let hasWon = false;
  hasWon = checkHorizontal(tokenLocation);
  if (!hasWon) {
    hasWon = checkVertical(tokenLocation);
    if (!hasWon) {
      hasWon = checkDiagonal(tokenLocation);
    }
  }
  if (hasWon) endGame();
  else changePlayerTurn();
};

const checkHorizontal = (tokenLocation) => {
  //only need to check the row where the token was inserted
  let myToken = playerTurn === 1 ? "X" : "O";
  let tokenRow = tokenLocation[0];
  let counter = 0;
  for (let i = 0; i < 7; i++) {
    if (myGrid[tokenRow][i] === myToken) counter++;
    else counter = 0;
    if (counter === 4) return true;
  }
  return false;
};

const checkVertical = (tokenLocation) => {
  //only need to check the col where the token was inserted
  let myToken = playerTurn === 1 ? "X" : "O";
  let tokenCol = tokenLocation[1];
  let counter = 0;
  for (let i = 0; i < 6; i++) {
    if (myGrid[i][tokenCol] === myToken) counter++;
    else counter = 0;
    if (counter === 4) return true;
  }
  return false;
};

// myGrid[[rows],[cols]]...

const checkDiagonal = (tokenLocation) => {
  let hasWon = false;
  hasWon = topLeft();
  if (!hasWon) {
    hasWon = botLeft();
    if (hasWon) return true;
  } else return true;
  return false;
};

const topLeft = () => {
  let myToken = playerTurn === 1 ? "X" : "O";
  let counter = 0;
  let rowLimit = 5;
  //top left to bot right
  let y = 0;
  let x = 0;
  let iterations = 0;
  let z = 0;
  for (z; z < 6; z++) {
    y = z;
    for (let i = 0; i < 6; i++) {
      //we will go through each row first
      for (x; x < 7; x++) {
        //x is for cols, y is for rows
        if (myGrid[y][x] === myToken) counter++;
        if (counter === 4) return true;
        //console.table("row: " + y, "col: " + x);
        rowLimit = x >= 3 ? rowLimit-- : rowLimit;
        if (y < rowLimit) y++;
        else if (y >= rowLimit || x === 6) {
          iterations++;
          x = iterations;
          y = z;
          //console.log("----------------");
          counter = 0;
          break;
        }
      }
      counter = 0;
    }
    x = 0;
    iterations = 0;
    counter = 0;
    //console.table(myGrid);
  }
};

const botLeft = () => {
  let myToken = playerTurn === 1 ? "X" : "O";
  let counter = 0;
  let rowLimit = 0;
  //top left to bot right
  let y = 5;
  let x = 0;
  let iterations = 0;
  let z = 5;
  for (z; z > 0; z--) {
    y = z;
    for (let i = 0; i < 6; i++) {
      //we will go through each row first
      for (x; x < 7; x++) {
        //x is for cols, y is for rows
        if (myGrid[y][x] === myToken) counter++;
        if (counter === 4) return true;
        console.table("row: " + y, "col: " + x);
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
};

const changePlayerTurn = () => {
  playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);
  return playerMove(); //after changing player turn, let the current player make his move
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

generateGrid();

//deal with buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (!gameOver) return checkSlots(i);
  });
}
