// Get Elements
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, seconNumber) => firstNumber / seconNumber,
  "*": (firstNumber, seconNumber) => firstNumber * seconNumber,
  "+": (firstNumber, seconNumber) => firstNumber + seconNumber,
  "-": (firstNumber, seconNumber) => firstNumber - seconNumber,
  "=": (firstNumber, seconNumber) => seconNumber,
};

let firstVal = 0;
let operatorVal = "";
let awaitingNextVal = false;

// Send Number value
function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextVal) {
    calculatorDisplay.textContent = number;
    awaitingNextVal = false;
  } else {
    // if current display is 0, replace it, if not add number
    const displayVal = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayVal === "0" ? number : displayVal + number;
  }
}

// Add Decimal
function addDecimal() {
  // If operator presed, don't add decimal
  if (awaitingNextVal) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Use the operator
function useOperator(operator) {
  const currentVal = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorVal && awaitingNextVal) {
    operatorVal = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstVal) {
    firstVal = currentVal;
  } else {
    const calculation = calculate[operatorVal](firstVal, currentVal);
    calculatorDisplay.textContent = calculation;
    firstVal = calculation;
  }
  // Ready for next value, store operator
  awaitingNextVal = true;
  operatorVal = operator;
}

// Reset display
function resetAll() {
  firstVal = 0;
  operatorVal = "";
  awaitingNextVal = false;
  calculatorDisplay.textContent = "0";
  console.clear();
}

// Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Event Listeners
clearBtn.addEventListener("click", resetAll);
