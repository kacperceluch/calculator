const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".del");
const clearAllButton = document.querySelector(".ac");
const previousValue = document.querySelector(".previous-value");
const currentValue = document.querySelector(".current-value");

var currentCalculation = "";
var previousCalculation = "";
var operation = undefined;
var checkEquals = false;

const addNumber = (number) => {
    if (number === "." && currentCalculation.includes(".")) return
    if (currentCalculation.length === 0 && number ===".") {number = "0."}
    if (checkEquals === true) {
        currentCalculation = "";
    }
    currentCalculation = currentCalculation.toString() + number.toString();
    checkEquals = false;
}

const chooseOperator = (operator) => {
    if (currentCalculation === null) {
        return
    } 
    if (previousCalculation !== "") {
        const previous = previousValue.innerText;
        if (currentCalculation.toString() === "0" && previous[previous.length - 1] ==="÷") {
            clearAll();
            return;
        }
        calculation();
    }
    
    operation = operator;
    previousCalculation = currentCalculation;
    currentCalculation = "";
}

const deleteNumber = () => {
        currentCalculation = currentCalculation.toString().slice(0, -1);   
}

const calculation = () => {
    if (!previousCalculation || !currentCalculation) {
        return
    }

    let result = 0;
    const current = Number(currentCalculation);
    const previous = Number(previousCalculation);
    checkEquals = true;
    
    switch(operation) {
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "*":
            result = previous * current;
            break;
        case "÷":
            if (current !== 0) {
               result = previous / current;
            } else {
                clearAll();
               return
            }
            break;
        default:
            return
    }

    currentCalculation = result;
    operation = undefined;
    previousCalculation = "";
}

const actualizeResult = () => {
    currentValue.innerText = currentCalculation;
    if (operation !== undefined ) {
        previousValue.innerText = previousCalculation + operation;
    } else {
        previousValue.innerText = "";
    }
}

const clearAll = () => {
    currentCalculation = "";
    previousCalculation = "";
    operation = undefined;
}

numberButtons.forEach((number) => {
    number.addEventListener("click", () => {
        addNumber(number.innerText);
        actualizeResult();
    });
});

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", () => {
        chooseOperator(operator.innerText);
        actualizeResult();
    });
});

deleteButton.addEventListener("click", () => {
    deleteNumber();
    actualizeResult();
});

equalsButton.addEventListener("click", () => {
    calculation();
    actualizeResult();
    console.log(checkEquals);
});

clearAllButton.addEventListener("click", () => {
    clearAll();
    actualizeResult();
});