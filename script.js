
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons button");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

function enterNumber(number) {
    if (waitingForSecondNumber || display.value === "Error") {
        display.value = number;
        waitingForSecondNumber = false;
    } else if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function chooseOperator(selectedOperator) {
    firstNumber = Number(display.value);
    operator = selectedOperator;
    waitingForSecondNumber = true;
}

function calculate() {
    if (operator === "") return;

    const secondNumber = Number(display.value);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = secondNumber === 0
                ? "Error"
                : firstNumber / secondNumber;
            break;
    }

    display.value = result === "Error"
        ? "Error"
        : String(Number(result.toPrecision(10)));

    firstNumber = "";
    operator = "";
    waitingForSecondNumber = true;
}

function clearCalculator() {
    display.value = "0";
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
}

function deleteDigit() {
    if (display.value === "Error") {
        clearCalculator();
        return;
    }

    if (waitingForSecondNumber) return;

    if (display.value.length === 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function enterDecimal() {
    if (waitingForSecondNumber) {
        display.value = "0.";
        waitingForSecondNumber = false;
    } else if (!display.value.includes(".")) {
        display.value += ".";
    }
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent.trim();

        if (value >= "0" && value <= "9") {
            enterNumber(value);

        } else if (value === "+") {
            chooseOperator("+");

        } else if (value === "-") {
            chooseOperator("-");

        } else if (value === "*" || value === "×") {
            chooseOperator("*");

        } else if (value === "/" || value === "÷") {
            chooseOperator("/");

        } else if (value === "=") {
            calculate();

        } else if (value === "AC") {
            clearCalculator();

        } else if (value === "DEL") {
            deleteDigit();

        } else if (value === ".") {
            enterDecimal();

        } else if (value === "%") {
            display.value = String(Number(display.value) / 100);
        }
    });
});