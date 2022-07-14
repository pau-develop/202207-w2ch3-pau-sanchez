let userInput;
const inputArr = [];
let endProgram;

const isNotNaN = (input) => {
  const scopeInput = parseInt(input, 10);
  return !Number.isNaN(scopeInput);
};
const isInputNull = (input) => input === null;

const getOperationLength = (array) => array.length;

function changeStr(operationLength) {
  let string;
  if (operationLength.length === 0) {
    if (userInput === undefined) string = `Dame un número`;
    else if (userInput === null)
      string = `Me tienes que dar un número por lo menos ¬¬`;
  } else if (operationLength.length === 1 && userInput !== null)
    string = `Dame otro número o cancela`;
  return string;
}
function showSquareRoot() {
  alert(
    `la raíz cuadrada de ${inputArr[0]} es ${Math.sqrt(inputArr[0]).toFixed(3)}`
  );
}

function showMathOps() {
  alert(`El resultado de la suma de tus números es ${inputArr[0] + inputArr[1]}
  El resultado de la resta de tus números es ${inputArr[0] - inputArr[1]}
  El resultado de la multiplicación de tus números es ${
    inputArr[0] * inputArr[1]
  }
  El resultado de la división de tus números es ${inputArr[0] / inputArr[1]}`);
}

function getInput() {
  const myStr = changeStr(inputArr);
  userInput = prompt(myStr);
  const isNull = isInputNull(userInput);
  const isNumber = isNotNaN(userInput);
  const operationLength = getOperationLength(inputArr);
  if (isNull && operationLength === 1) {
    showSquareRoot();
    endProgram = true;
  } else if (!isNull && isNumber) {
    inputArr.push(userInput);
    if (operationLength === 1) {
      showMathOps();
      endProgram = true;
    }
  }
  return endProgram ? 0 : getInput();
}

if (!endProgram) getInput();
