const buttons = document.querySelectorAll(".btn");
const display = document.querySelector(".display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let waitingForSecondNumber = false;
let resultDisplayed = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error: Div by 0";
  return a / b;
}

function operate(a, b, operation) {
  return operation(a, b);
}

const stringOperation = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

function roundResult(num) {
  return Math.round(num * 1000000) / 1000000;
}

function clickButtons() {
  for (const button of buttons) {
    button.addEventListener("click", function (event) {
      const value = event.target.textContent;

      if ("0123456789.".includes(value)) {
        if (resultDisplayed) {
          firstNumber = "";
          resultDisplayed = false;
        }
        if (!waitingForSecondNumber) {
          firstNumber += value;
          display.value = firstNumber;
        } else {
          secondNumber += value;
          display.value = secondNumber;
        }
      } else if (["+", "-", "*", "/"].includes(value)) {
        if (firstNumber === "") return;

        if (operator && !waitingForSecondNumber) {
          operator = value; // Change operator if pressed consecutively
          return;
        }

        if (operator && secondNumber !== "") {
          const opFunc = stringOperation[operator];
          let res = operate(Number(firstNumber), Number(secondNumber), opFunc);

          if (typeof res === "number") {
            res = roundResult(res);
          }
          if (typeof res === "string" && res.startsWith("Error")) {
            display.value = res;
            resetCalculator();
            return;
          }

          firstNumber = String(res);
          display.value = firstNumber;
          secondNumber = "";
        }

        operator = value;
        waitingForSecondNumber = true;
        resultDisplayed = false;
      } else if (value === "=") {
        if (firstNumber === "" || secondNumber === "" || !operator) return;

        const opFunc = stringOperation[operator];
        let res = operate(Number(firstNumber), Number(secondNumber), opFunc);

        if (typeof res === "number") {
          res = roundResult(res);
        }
        if (typeof res === "string" && res.startsWith("Error")) {
          display.value = res;
          resetCalculator();
          return;
        }

        display.value = res;
        firstNumber = String(res);
        secondNumber = "";
        operator = "";
        waitingForSecondNumber = false;
        resultDisplayed = true;
      } else if (value.toLowerCase() === "clear") {
        resetCalculator();
        display.value = "";
      }
    });
  }
}

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  waitingForSecondNumber = false;
  resultDisplayed = false;
}

clickButtons();
