let cardArr = new Array(); //this array contains the numbers in the player card;
let pulledNumbers = new Array(); //this array stores the numbers that come out of "el bombo", because they shouldn't repeat;
let counter = 0; //we count the numbers that came out of 'el bombo'
let lineCounter = 0;
let isLine = false; //we check wether se ha cantado línea o no...
let gameOver = false;

const generateBingoCard = (cardArr) => {
  let newNum = Math.floor(Math.random() * 100);
  if (newNum === 0 || cardArr.includes(newNum))
    return generateBingoCard(cardArr);
  if (cardArr.length < 15) {
    cardArr.push(newNum);
    return generateBingoCard(cardArr);
  } else {
    console.log(`LINES CORRESPOND TO indexes 0-4, 5-9 & 10-14`);
    console.table(cardArr);
    askForPlayerInput(cardArr);
  }
};

const askForPlayerInput = (cardArr) => {
  alert(`WELCOME TO THE SKYLAB BINGO`);
  let playerDecision = confirm(`Would you like to keep the current card?`);
  if (playerDecision) {
    alert(`Let's Play!`);
    pullNumber(cardArr, pulledNumbers);
  } else {
    cardArr = new Array();
    generateBingoCard(cardArr);
  }
};

const pullNumber = (cardArr, pulledNumbers) => {
  let newNum = Math.floor(Math.random() * 100);
  if (newNum === 0 || pulledNumbers.includes(newNum))
    return pullNumber(cardArr, pulledNumbers);
  else {
    alert(`Number ${newNum}!`);
    counter++;
    pulledNumbers.push(newNum);
    checkNumberAgainstCard(newNum, cardArr);
  }
};

const checkNumberAgainstCard = (newNum, cardArr) => {
  if (cardArr.includes(newNum)) {
    let tempIndex = cardArr.indexOf(newNum);
    cardArr[tempIndex] = "x";
    console.log(`LINES CORRESPOND TO indexes 0-4, 5-9 & 10-14`);
    console.table(cardArr);
    alert(
      `You DO have that number! ╰(*°▽°*)╯ scratching number out of the card...`
    );
    if (!isLine) {
      checkForLine(cardArr, 0, 5);
      checkForLine(cardArr, 5, 10);
      checkForLine(cardArr, 10, 15);
    }
    checkForBingo(cardArr);
    if (!gameOver) pullNumber(cardArr, pulledNumbers);
  } else {
    alert(`You don't have that number... ಥ_ಥ`);
    pullNumber(cardArr, pulledNumbers);
  }
};
//esta es la forma que se me ha ocurrido para comprobar si han cantado línea, aunque me parece
//un poco extraña, algo de feedback en esta función me iría bien.
const checkForLine = (cardArr, startIndex, endIndex) => {
  let counter = 0;
  for (let i = startIndex; i < endIndex; i++) {
    if (cardArr[i] === "x") counter++;
    if (counter === 5) {
      isLine = true;
      alert(`Han cantado línea en ${counter} turnos!`);
      lineCounter = counter;
      return pullNumber(cardArr, pulledNumbers);
    }
  }
  if (endIndex === 15) return pullNumber(cardArr, pulledNumbers);
};

const checkForBingo = (cardArr) => {
  for (let i = 0; i < cardArr.length; i++) {
    if (cardArr[i] !== "x") {
      return pullNumber(cardArr, pulledNumbers);
    }
  }
  //si hace todo el loop es que todos los números estan marcados y podemos retornar endGame();
  return endGame();
};

const endGame = () => {
  gameOver = true;
  alert(`Han cantado bingo en ${counter} turnos! ༼ つ ◕_◕ ༽つ`);
};

generateBingoCard(cardArr);
