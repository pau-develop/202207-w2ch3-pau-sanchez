let runLoop = true;
let userInput;
const inputArr = [];

function changeStr() {
  let string;
  if (inputArr.length === 0) {
    if (userInput === undefined) string = `Dame un número`;
    else if (userInput === null)
      string = `Me tienes que dar un número por lo menos ¬¬`;
  } else if (inputArr.length === 1 && userInput !== null)
    string = `Dame otro número o cancela`;
  return string;
}

function getInput() {
  const string = changeStr();
  userInput = prompt(string);
  if (userInput !== null) {
    userInput = parseInt(userInput, 10);
    if (!Number.isNaN(userInput)) inputArr.push(userInput);
  }
  checkCondition();
}

//función para cambiar el bool runLoop
function checkCondition() {
  if (inputArr.length === 2) runLoop = false;
  else if (inputArr.length === 1 && userInput === null) runLoop = false;
}
//función para enseñar el resultado final
function showResults() {
  console.log(inputArr);
  //raiz cuadrada
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

//el loop
while (runLoop) {
  getInput();
  console.log(userInput);
}
//si el run para de correr llama la función showResults();
if (!runLoop) showResults();
