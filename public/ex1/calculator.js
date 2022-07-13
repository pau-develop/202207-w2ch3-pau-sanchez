let runLoop = true;
let userInput;
const inputArr = [];

export function changeStr() {
  let string;
  if (inputArr.length === 0) {
    if (userInput === undefined) string = `Dame un número`;
    else if (userInput === null)
      string = `Me tienes que dar un número por lo menos ¬¬`;
  } else if (inputArr.length === 1 && userInput !== null)
    string = `Dame otro número o cancela`;
  return string;
}

export function checkCondition() {
  if (inputArr.length === 2) runLoop = false;
  else if (inputArr.length === 1 && userInput === null) runLoop = false;
}

export function getInput() {
  const string = changeStr();
  userInput = prompt(string);
  if (userInput !== null) {
    userInput = parseInt(userInput, 10);
    if (!Number.isNaN(userInput)) inputArr.push(userInput);
  }
  checkCondition();
}

export function showResults() {
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
