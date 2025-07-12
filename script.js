function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

// Calculator operation
const numberOne = 3;
const operation = add;
const numberTwo = 6;

function operate(a, b, operation) {
  return operation(a, b);
}

console.log(operate(3, 6, add));
