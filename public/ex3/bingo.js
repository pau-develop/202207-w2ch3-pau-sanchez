const card = [];
const pulledNumbers = [];
let counter = 0;
let isLine = false;
let gameOver = false;

const generateBingoCard = (myCard) => {
  const newNum = Math.floor(Math.random() * 100);
  if (newNum === 0 || myCard.includes(newNum)) return generateBingoCard(myCard);
  if (myCard.length < 15) {
    myCard.push(newNum);
    return generateBingoCard(myCard);
  } else {
    console.log(`LINES CORRESPOND TO indexes 0-4, 5-9 & 10-14`);
    console.table(myCard);
    askForPlayerInput(myCard);
  }
};

const endGame = () => {
  gameOver = true;
  alert(`Han cantado bingo en ${counter} turnos! ༼ つ ◕_◕ ༽つ`);
};

const pullNumber = (cardArr, myPulledNumbers) => {
  const newNum = Math.floor(Math.random() * 100);
  if (newNum === 0 || myPulledNumbers.includes(newNum))
    return pullNumber(cardArr, myPulledNumbers);
  else {
    alert(`Number ${newNum}!`);
    counter++;
    myPulledNumbers.push(newNum);
    checkNumberAgainstCard(newNum, cardArr);
  }
};

const askForPlayerInput = (cardArr) => {
  alert(`WELCOME TO THE SKYLAB BINGO`);
  const playerDecision = confirm(`Would you like to keep the current card?`);
  if (playerDecision) {
    alert(`Let's Play!`);
    pullNumber(cardArr, pulledNumbers);
  } else {
    generateBingoCard(cardArr);
  }
};

const checkForBingo = (cardArr) => {
  for (let i = 0; i < cardArr.length; i++) {
    if (cardArr[i] !== "x") {
      return pullNumber(cardArr, pulledNumbers);
    }
  }
  return endGame();
};

const checkForLine = (cardArr, startIndex, endIndex) => {
  let myCounter = 0;
  for (let i = startIndex; i < endIndex; i++) {
    if (cardArr[i] === "x") myCounter++;
    if (myCounter === 5) {
      isLine = true;
      alert(`Han cantado línea en ${myCounter} turnos!`);
      return pullNumber(cardArr, pulledNumbers);
    }
  }
  if (endIndex === 15) return pullNumber(cardArr, pulledNumbers);
};

const checkNumberAgainstCard = (newNum, cardArr) => {
  if (cardArr.includes(newNum)) {
    const tempIndex = cardArr.indexOf(newNum);
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

generateBingoCard(card);
