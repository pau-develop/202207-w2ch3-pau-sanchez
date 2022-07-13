let runLoop = true;
let userInput;
const inputArr = [];

function checkCondition() {
  if (inputArr.length === 2) runLoop = false;
  else if (inputArr.length === 1 && userInput === null) runLoop = false;
}

function changeStr() {
  let myString;
  if (inputArr.length === 0) {
    if (userInput === undefined) myString = `Dame un número`;
    else if (userInput === null)
      myString = `Me tienes que dar un número por lo menos ¬¬`;
  } else if (inputArr.length === 1 && userInput !== null)
    myString = `Dame otro número o cancela`;
  return myString;
}

function getInput() {
  const myStr = changeStr();
  userInput = prompt(myStr);
  if (userInput !== null) {
    userInput = parseInt(userInput, 10);
    if (!Number.isNaN(userInput)) inputArr.push(userInput);
  }
  checkCondition();
}

function showResults() {
  if (inputArr.length === 1)
    alert(
      `la raíz cuadrada de ${inputArr[0]} es ${Math.sqrt(inputArr[0]).toFixed(
        3
      )}`
    );
  else
    alert(`El resultado de la suma de tus números es ${
      inputArr[0] + inputArr[1]
    }
  El resultado de la resta de tus números es ${inputArr[0] - inputArr[1]}
  El resultado de la multiplicación de tus números es ${
    inputArr[0] * inputArr[1]
  }
  El resultado de la división de tus números es ${inputArr[0] / inputArr[1]}`);
}

while (runLoop) {
  getInput();
}

if (!runLoop) showResults();
