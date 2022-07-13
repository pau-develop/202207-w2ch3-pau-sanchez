const buttons = document.querySelectorAll("button");
let numDisplay = document.getElementById("calc-op");
let resDisplay = document.getElementById("calc-res");
let result;
console.log(numDisplay.textContent);
// AC stands for All Clear. AC clears the calculator and resets any functions.

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (i === 0) clearAll();
    else if (i === 1) clearLastEntry();
    else if (i === 17) manageArray();
    else if (i === 2 || i === 6 || i === 10 || i === 14)
      pushOperator(buttons[i].innerHTML);
    else pushNumber(buttons[i].innerHTML);
  });
}

let currentNum;
let myNum = "";
let myOp;
let myArr = [];
let isPares = false;

//odd indexed in myArr are for operators, even indexes are for numbers [1,+,2,-,20...];

const clearAll = () => {
  result = undefined;
  resDisplay.textContent = "";
  clearBottomDisplay();
};

const clearBottomDisplay = () => {
  //reset all variables
  console.log("CLEAR BOTTOM");
  currentNum = 0;
  myNum = "";
  myOp = "";
  myArr = new Array();
  displayOnScreen();
};
const clearLastEntry = () => {
  myNum = "";
  displayOnScreen();
};
const pushNumber = (num) => {
  //if we already have a result in the top display and we start the next operation with number get rid of top result
  //if we already have a result in the top display and we start the next operation with operator add that top result to current operation
  if (result !== undefined && myArr.length === 0) {
    result = undefined;
    resDisplay.textContent = "";
  }
  //do it so we can only put one '.' on each number
  if (num !== ".") {
    myNum += num;
  } else {
    if (!myNum.includes(".")) myNum += num;
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

const manageArray = () => {
  console.log("GET RESULT");
  myArr.push(myNum);
  if (myArr.length >= 3) {
    //if the last index is an operator we're gonna get rid of it
    if (myArr.length % 2 === 0) myArr.pop();
    splitArr();
  }
};

const splitArr = () => {
  //first separate nums and operators in two arrays
  let numArr = [];
  let opArr = [];
  for (let i = 0; i < myArr.length; i++) {
    if (i % 2 === 0) numArr.push(Number(myArr[i]));
    else opArr.push(myArr[i]);
  }
  console.log(numArr, opArr);
  getResult(numArr, opArr);
};

const getResult = (numArr, opArr) => {
  if (result === undefined) {
    //if result is undefined that means this is our first operation
    //otherwise will add the next operation to the current result
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
