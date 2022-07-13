const buttons = document.querySelectorAll("button");
const numDisplay = document.getElementById("calc-op");
const resDisplay = document.getElementById("calc-res");
let result;
let myNum = "";
let myArr = [];

const displayOnScreen = () => {
  let tempStr = "";
  for (let i = 0; i < myArr.length; i++) {
    tempStr += `${myArr[i]} `;
    console.log(tempStr);
  }
  tempStr += myNum;
  numDisplay.textContent = tempStr;
  if (result !== undefined) resDisplay.textContent = result;
};

const clearBottomDisplay = () => {
  console.log("CLEAR BOTTOM");
  myNum = "";
  myArr = [];
  displayOnScreen();
};

const clearAll = () => {
  result = undefined;
  resDisplay.textContent = "";
  clearBottomDisplay();
};

const clearLastEntry = () => {
  myNum = "";
  displayOnScreen();
};
const pushNumber = (num) => {
  if (result !== undefined && myArr.length === 0) {
    result = undefined;
    resDisplay.textContent = "";
  }

  if (num !== ".") {
    myNum += num;
  }
  console.log(myNum);
  displayOnScreen();
};
const pushOperator = (op) => {
  if (myNum === "") {
    if (result === undefined) {
      myNum = "0";
    } else {
      myNum = result;
    }
  }
  myArr.push(myNum);
  myNum = "";
  myArr.push(op);
  console.log(myArr);
  displayOnScreen();
};

const getResult = (numArr, opArr) => {
  if (result === undefined) {
    result = numArr[0];
  }
  for (let i = 0; i < opArr.length; i++) {
    if (opArr[i] === "X") {
      result *= numArr[i + 1];
    } else if (opArr[i] === "/") {
      result /= numArr[i + 1];
    } else if (opArr[i] === "+") {
      result += numArr[i + 1];
    } else if (opArr[i] === "-") {
      result -= numArr[i + 1];
    }
    numDisplay.textContent = "";
    resDisplay.textContent = result;
    clearBottomDisplay();
  }
};

const splitArr = () => {
  const numArr = [];
  const opArr = [];
  for (let i = 0; i < myArr.length; i++) {
    if (i % 2 === 0) numArr.push(Number(myArr[i]));
    else opArr.push(myArr[i]);
  }
  console.log(numArr, opArr);
  getResult(numArr, opArr);
};

const manageArray = () => {
  console.log("GET RESULT");
  myArr.push(myNum);
  if (myArr.length >= 3) {
    if (myArr.length % 2 === 0) myArr.pop();
    splitArr();
  }
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (i === 0) return clearAll();
    else if (i === 1) clearLastEntry();
    else if (i === 17) manageArray();
    else if (i === 2 || i === 6 || i === 10 || i === 14)
      pushOperator(buttons[i].innerHTML);
    else pushNumber(buttons[i].innerHTML);
  });
}
