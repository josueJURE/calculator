const btns = document.querySelectorAll("[data-value]");
const historyElement = document.querySelector(".computation-history");
let screen = document.querySelector("[data-screen]");
const historyBtn = document.querySelector(".history-btn");
const slidingPart = document.querySelector(".sliding-part");
const computationHistoryParent = document.querySelector(".computation-history-parent");
const operators = document.querySelectorAll("[data-operator]");
const clearHistoryBtn = document.querySelector(".clear-history-btn");

clearHistoryBtn.addEventListener("click", () => {historyElement.innerHTML = "";
});

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {

  const key = event.key;
  const button = document.querySelector(`[data-value="${key}"]`);



  if (button) {
    button.click(); // Trigger the click event for the corresponding button
  } 

  if (event.code === "Backspace") {
    let newArray = data.slice(ZERO, -1);
    screen.innerText = newArray.join("");
    data = newArray;
    if (screen.innerText === "") {
      screen.innerText = ZERO;
    }
  }

  if(event.code === "Enter") {
    userClicksOnEqualButton("=");
  }

}


const operatorRegex = /[\/*\-+]/;
const ZERO = 0;
const ZERO_DOT = "0.";
const HISTORY_LIMIT = 10;
const history = [];

historyBtn.addEventListener("click", () => {
  slidingPart.classList.toggle("slide");
  computationHistoryParent.classList.toggle("visility");
});

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

clearHistoryBtn.addEventListener("click", () => {
  historyElement.innerHTML = "";
});

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

    if (match) {
      let start = currentExpression.length - match[ZERO].length;
      let end = currentExpression.length;
      let currentValue = Number(match[ZERO]);

      if (!isNaN(currentValue)) {
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
      if (areYouDividingdZeroByZero(replacedArray)) {
        screen.innerText = "0÷0 is an invalid format. Press AC";
      } else {
        let result = eval(replacedArray.join(""));
        let historyEntries = [[...replacedArray, "=", result]]; // Used slice() at first. But slice() is not sufficient because it only creates a shallow copy of the array, and modifications to the new array will still affect the original array. The spread syntax ([...replacedArray]), which creates a shallow copy as well, is a concise way to create a new array with the same elements as the existing array. While ensuring that modifications to historyEntries do not affect replacedArray, and vice versa.
        replacedArray.splice(replacedArray.length, 0, "=", result);
        displayResult(replacedArray, result);
        screen.innerText = !Number.isFinite(result)
          ? "You cannot divide by zero. Press AC"
          : result;
        data = [];
        data.push(result);
        createHistoryList(historyEntries, historyElement, history);
        togglesClearHistoryButton(historyElement, clearHistoryBtn);
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

function createHistoryList(array, element, history) {
  array.forEach((entry) => {
    history.push(entry);
    element.innerHTML += `<li> ${entry.join(" ")}</li>`;
    if (element.childElementCount > HISTORY_LIMIT) {
      element.firstElementChild.remove();
    }
  });
}
clearHistoryBtn.addEventListener("click", () => {
  historyElement.innerHTML = "";
  togglesClearHistoryButton(historyElement, clearHistoryBtn);
});

function togglesClearHistoryButton(element, btn) {
  btn.classList.toggle("display", element.childElementCount > 0);
}
// functions creations ends
