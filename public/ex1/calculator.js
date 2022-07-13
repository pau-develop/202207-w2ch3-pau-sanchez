// CALCULADORA by Pau Sánchez
// 1- Un único programa al que le pasarás uno o dos parámetros mediante prompt.
// 2- Los resultados deberían ser mostrados con 3 decimales como mucho (En caso que hubieran).
// 3- El programa debe contemplar e informar al usuario en el caso de que este introduzca cualquier cosa que no sean números (Ya sea mostrar un error o volver a pedir que introduzca un número de nuevo).
// 4- Si el usuario introduce UN solo número, deberá mostrar SOLO su raíz cuadrada.
// 5- Si introduce DOS números se mostrarán los resultados de la suma, resta, multiplicación y división de dichos valores.
// 6- Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
// // Output>
// Results:
// The result of the sum is resultSum
// The result of the rest is resultRest

//VARIABLES
let runLoop = true; //condición que hace correr el while loop
let userInput; //aquí guardámos el input del prompt
const inputArr = []; //esta array guarda los userInput, ya sean uno o dos

//FUNCIONES

//get user input
function getInput() {
  let myStr = changeStr();
  userInput = prompt(myStr);
  if (userInput !== null) {
    userInput = parseInt(userInput);
    if (!isNaN(userInput)) inputArr.push(userInput);
  }
  checkCondition();
}
//el mensaje del prompt cambia en función de lo que introduzca o clique el user
function changeStr() {
  if (inputArr.length === 0) {
    if (userInput === undefined) myStr = `Dame un número`;
    else if (userInput === null)
      myStr = `Me tienes que dar un número por lo menos ¬¬`;
  } else if (inputArr.length === 1 && userInput !== null)
    myStr = `Dame otro número o cancela`;
  return myStr;
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
