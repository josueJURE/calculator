const btns = document.querySelectorAll("[data-value]");
const computationHistory = document.querySelector(".computation-history");
let screen = document.querySelector("[data-screen]");
const historyBtn = document.querySelector(".history-btn");
const slidingPart = document.querySelector(".sliding-part");
const operators = document.querySelectorAll("[data-operator]");


const operatorRegex = /[\/*\-+]/;
const ZERO = 0;
const ZERO_DOT = '0.';
const history = [];

console.log(slidingPart)


historyBtn.addEventListener("click", () => {
  slidingPart.classList.toggle("slide")
  computationHistory.classList.toggle("visility")
})


console.log(computationHistory )




let data = [];

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonValue = e.target.dataset.value;

    insertOpeningParenthesis(buttonValue);

    insertClosingParenthesis(buttonValue);

    deleteEverythingFromScreen(buttonValue);

    toggleSign(buttonValue);

    canUserAddDot(buttonValue);

    userClicksOnEqualButton(buttonValue);

    handlingZeroFollowedByAdecimal(buttonValue);

    removesDecimalPointIfPrecededByAnOperator(buttonValue);

    handleNumberButton(buttonValue);

    deteLastEntry(buttonValue);

    convertToPercentage(buttonValue);

  
  });
});
// forEach ends & functions creations begins
function convertToPercentage(button) {
  if (button === "%") {
    screen.innerText = screen.innerText / 100;
  }
}

function deteLastEntry(button) {
  if (button === "DE") {
    let newArray = data.slice(ZERO, -1);
    screen.innerText = newArray.join("");
    data = newArray;
    if (screen.innerText === "") {
      screen.innerText = ZERO;
    }
  }
}

function canUserAddDot(button) {
  if (button === ".") {
    var dotAllowed = true;
    for (var i = data.length - 1; i >= ZERO; i--) {
      console.log("data > " + data[i]);
      if (data[i] === ".") {
        dotAllowed = false;
        break;
      } else if (operatorRegex.test(data[i])) {
        break;
      }
    }
    if (dotAllowed) {
      if (data.length == ZERO) {
        data.push("0");
      } else if (operatorRegex.test(data[data.length - 1])) {
        data.push("0");
      }
      data.push(".");
    }
    screen.innerText = data.join("");
  }
}

function deleteEverythingFromScreen(button) {
  if (button === "AC") {
    screen.innerText = "";
    data = [];
    screen.innerText = ZERO;
  }
}

function toggleSign(button) {
  if (button === "minus") {
    let currentExpression = data.join("");
    let reversedExpression = currentExpression.split("").join("");
    let match = reversedExpression.match(/(\d+(\.\d+)?)|(\D+)/); // Match a number or non-digit
    // debugger

    if (match) {
      let start = currentExpression.length - match[ZERO].length;
      let end = currentExpression.length;
      let currentValue = Number(match[ZERO]);

      if (!isNaN(currentValue)) {
        // If it's a number, toggle its sign
        currentValue = -currentValue;
        data = data
          .slice(ZERO, start)
          .concat(currentValue.toString().split(""), data.slice(end));
        screen.innerText = data.join("");
      }
    }
  }
}

function insertOpeningParenthesis(button) {
  if (button === "(") {
    let isOpenparenthesis = true;
    for (let i = data.length - 1; i >= ZERO; i--) {
      if (/^\d$/.test(data[i])) {
        isOpenparenthesis = false;
        break;
      }
      if (data[i] === ")") {
        isOpenparenthesis = false;
        break;
      }
      if (operatorRegex.test(data[i])) {
        break;
      }
    }
    if (isOpenparenthesis) {
      data.push("(");
    }
    screen.innerText = data.join("");
  }
}

function insertClosingParenthesis(button) {
  if (button === ")") {
    data.push(")");
    screen.innerText = data.join("");
  }
}

function handlingZeroFollowedByAdecimal(button) {
  if (Number(button) === ZERO && screen.innerText.startsWith(ZERO_DOT)) {
    screen.innerText += button;
  }
}

function removesDecimalPointIfPrecededByAnOperator(button) {
  if (operatorRegex.test(button)) {
    if (data.slice(-1)[ZERO] === ".") {
      data.pop();
    }
    button === "*" ? (button = "x") : button === "/" ? (button = "÷") : button;

    data.push(button);
    screen.innerText = data.join("");
  }
}

function handleNumberButton(button) {
  if (!isNaN(Number(button))) {
    screen.innerText = button;
    data.push(screen.innerText);
    screen.innerText = data.join("");
  }
}

function userClicksOnEqualButton(button) {
  if (button === "=") {
    try {
      const replacedArray = data.map((item) =>
        item === "x" ? "*" : item === "÷" ? "/" : item
      );
      // Check if the expression involves 0/0
      // if (areYouDivindingByZero(replacedArray)) {
      //   screen.innerText = "You cannot divide by zero. Press AC";
      // }

      if (areYouDividingdZeroByZero(replacedArray)) {
        screen.innerText = "0÷0 is an invalid format. Press AC";
      } else {
        let result = eval(replacedArray.join(""));
        replacedArray.splice(replacedArray.length, 0, "=", result);
        history.push(replacedArray.join(""))
        console.log(history);

        displayResult(replacedArray, result);
        screen.innerText = !Number.isFinite(result) ? "You cannot divide by zero. Press AC" : result;
        // divideByZero(screen, result);
        data = [];
        data.push(result);
      }
    } catch (e) {
      screen.innerText = `${e.name} press AC`;
    }
  }
}

function areYouDivindingByZero(array) {
  for (let i = ZERO; i < array.length - 2; i++) {
    if (
      !isNaN(Number(array[i])) &&
      array[i + 1] === "/" &&
      array[i + 2] === "0"
    ) {
      return true;
    }
  }
  return false;
}

function areYouDividingdZeroByZero(array) {
  for (let i = ZERO; i < array.length - 2; i++) {
    if (array[i] === "0" && array[i + 1] === "/" && array[i + 2] === "0") {
      return true;
    }
  }
  return false;
}

function displayResult(array, outcome) {
  array = [];
  array.push(outcome);
}
// functions creations ends
