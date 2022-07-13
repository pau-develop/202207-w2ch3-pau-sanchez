//I copied all this code to generate divs along the edge of a circle with a given radius from stackoverflow, please refer below:
//https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//Honestly, I wouldn't be able to figure all this on my own as I am not a mathmatician, although I do kind of understand the code now
let circleArray = [];

const theta = [];
const setup = (n, r, id) => {
  const main = document.getElementById(id);
  const mainHeight = parseInt(
    window.getComputedStyle(main).height.slice(0, -2)
  );

  for (let i = 0; i < n; i++) {
    const circle = document.createElement("div");
    circle.className = "circle number" + i;
    circleArray.push(circle);
    circleArray[i].posx = Math.round(r * Math.cos(theta[i])) + "px";
    circleArray[i].posy = Math.round(r * Math.sin(theta[i])) + "px";
    circleArray[i].style.position = "absolute";
    circleArray[i].style.backgroundColor = "rgb(100,20,220)";
    circleArray[i].style.top =
      mainHeight / 2 - parseInt(circleArray[i].posy.slice(0, -2)) + "px";
    circleArray[i].style.left =
      mainHeight / 2 + parseInt(circleArray[i].posx.slice(0, -2)) + "px";
    main.appendChild(circleArray[i]);
    tempH = document.createElement("h1");
    tempH.style =
      "background-color:transparent;text-align:center;padding-top:20%";
    circleArray[i].appendChild(tempH);
  }
  circleArray = putLettersInArray(circleArray);
};
const generate = (n, r, id) => {
  const frags = 360 / n;
  for (let i = 0; i <= n; i++) {
    theta.push((frags / 180) * i * Math.PI);
  }
  setup(n, r, id);
};

let radius;
window.innerHeight <= 800 ? (radius = 220) : (radius = 400);

const putLettersInArray = (circleArray) => {
  circleArray = circleArray.reverse();
  circleArray = reArrangeCircleArray(circleArray);
  let letters = "abcdefghijklmnñopqrstuvwxyz";
  for (let i = circleArray.length - 1; i >= 0; i--) {
    circleArray[i].childNodes[0].textContent = letters[i];
  }
  return circleArray;
};

//I want the first index of the array to be the div located in the top most part of the circle
//however the function from stackoverflow used above starts adding divs from the right
//so I am going to to rearrange the array to suit my needs
const reArrangeCircleArray = (circleArray) => {
  let nuArr = [];
  //19 is the index for div located at the top most part of the circle (the one that will hold the letter A)
  //and so it will be index 0 in our new array;
  let x = 19;
  for (let i = 0; i < circleArray.length; i++) {
    nuArr.push(circleArray[x]);
    x++;
    if (x === 27) x = 0;
  }
  return nuArr;
};

generate(27, radius, "main");

//here is where my code starts

//lets choose the radius of the circle according to screen size so we have a nice looking and even circle no matter the screen size

//down here I will reuse part of the code from the console version of pasapalabra
//I decided to move all the questions to a new file (questions.js) so we don't have to deal with such a long piece of code

let currentLetter = 0; //0 es a, 1 es b... etc
let textBox = document.getElementById("text-content");
let inputBox = document.getElementById("text-input");
let skipButton = document.getElementById("skip-button");
let currentState = 0;
let enterPress = false;
let timerSecs = document.getElementById("timer-secs");
let timerMins = document.getElementById("timer-mins");
let totalSecs = 180;
let actualSecs = 0;
let actualMins = 0;

const myinterval = setInterval(countTime, 1000);

function countTime() {
  if (currentState !== 4) {
    // Your code here
    // Parameters are purely optional.
    totalSecs--;
    actualMins = Math.floor(totalSecs / 60);
    actualSecs = totalSecs - actualMins * 60;
    timerMins.textContent = actualMins;
    timerSecs.textContent = actualSecs;
    if (totalSecs <= 0) {
      return endGame();
    }
  }
}

const handleClick = () => {
  if (currentState === 1) nextLetter();
  if (currentState === 3) checkForEndGame();
  skipButton.blur();
};
skipButton.addEventListener("click", handleClick);

const introGame = () => {
  currentState = 1;
  console.log(
    `¡Bienvenidos al pasapalabra de SKYLAB! Ya conocéis las reglas, así que... ¡Empezemos a jugar!`
  );

  textBox.textContent = `¡Bienvenidos al pasapalabra de SKYLAB! Ya conocéis las reglas, así que... ¡Empezemos a jugar!`;
  questions = randomizeQuestions(questions, questionsTwo, questionsThree);
};

const randomizeQuestions = (q, qTwo, qThree) => {
  let tempArr = [q, qTwo, qThree];
  for (let i = 0; i < q.length; i++) {
    let random = Math.floor(Math.random() * 3);
    q[i].question = tempArr[random][i].question;
    q[i].answer = tempArr[random][i].answer;
  }
  return q;
};

const checkForCurrentLetter = () => {
  if (currentLetter === questions.length - 1) currentLetter = 0;
  else currentLetter++;
  if (
    questions[currentLetter].status === 1 ||
    questions[currentLetter].status === 2
  ) {
    currentLetter === questions.length - 1
      ? (currentLetter = 0)
      : currentLetter++;
    return checkForCurrentLetter();
  } else return nextLetter();
};

document.addEventListener("keydown", (e) => {
  console.log(e.code);
  if (currentState === 2) {
    console.log(e.code);
    if (e.code === "Backspace") {
      if (inputBox.textContent.length > 0) {
        tempStr = inputBox.textContent;
        tempStr = tempStr.slice(0, tempStr.length - 1);
        inputBox.textContent = tempStr;
      }
    } else if (e.code === "Enter") {
      handlePlayerInput(inputBox.textContent);
    } else {
      myLetter = e.code; //keyA //keyB
      console.log(myLetter);
      myLetter = myLetter.slice(myLetter.length - 1, myLetter.length);
      inputBox.textContent += myLetter;
    }
  } else {
    if (e.code === "Enter") {
      handleClick(); //pressing enter is the same as clicking on skip
    }
  }
});
const nextLetter = () => {
  currentState = 2;
  skipButton.textContent = `ENTER (INPUT)`;
  console.log(`${questions[currentLetter].question}`);
  textBox.textContent = `${questions[currentLetter].question}`;
};

const handlePlayerInput = (txtContent) => {
  skipButton.textContent = `ENTER (SKIP)`;
  currentState = 3;
  inputBox.textContent = "";
  txtContent = txtContent.toLowerCase();
  console.log(txtContent);
  if (txtContent === "end") return endGame();
  else if (txtContent === "pasapalabra") {
    console.log("Pasámos palabra...");
    textBox.textContent = "Pasámos palabra...";
  } else if (txtContent === questions[currentLetter].answer) {
    questions[currentLetter].status = 1;
    console.log(`Respuesta correcta! Vamos con la siguiente!`);
    textBox.textContent = `Respuesta correcta! Vamos con la siguiente!`;
    circleArray[currentLetter].style.background = "green";
  } else {
    questions[currentLetter].status = 2;
    console.log(
      `Vaya! Lo siento, pero la respuesta correcta es ${questions[currentLetter].answer}.`
    );
    textBox.textContent = `Vaya! Lo siento, pero la respuesta correcta es ${questions[currentLetter].answer}.`;
    circleArray[currentLetter].style.background = "red";
  }
};

const checkForEndGame = () => {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].status === 0) return checkForCurrentLetter();
  }
  return endGame();
};

const endGame = () => {
  currentState = 4;
  let wrong = 0;
  let correct = 0;
  let unanswered = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].status === 1) correct++;
    else if (questions[i].status === 2) wrong++;
    else unanswered++;
  }
  if (unanswered === 0) {
    console.log(
      `Fin del juego! el jugador ha acertado ${correct} palabras y ha fallado ${wrong}.
      Presiona F5 para jugar de nuevo.`
    );
    textBox.textContent = `Fin del juego! el jugador ha acertado ${correct} palabras y ha fallado ${wrong}.
    Pressiona F5 para jugar de nuevo.`;
  } else {
    console.log(
      `Fin del juego! el jugador ha acertado ${correct} palabras, ha fallado ${wrong} y ha dejado ${unanswered} sin contestar.
      Presiona F5 para jugar de nuevo.`
    );
    textBox.textContent = `Fin del juego! el jugador ha acertado ${correct} palabras, ha fallado ${wrong} y ha dejado ${unanswered} sin contestar.
    Presiona F5 para jugar de nuevo.`;
  }
};

introGame();
