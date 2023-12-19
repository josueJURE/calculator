const btns = document.querySelectorAll("[data-value]");
let screen = document.querySelector("[data-screen]");
const operators = document.querySelectorAll("[data-operator]");

let data = [];

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonValue = e.target.dataset.value;

    insertOpeningParenthesis()

  

 

    if (buttonValue === ")") {
      data.push(")");
      screen.innerText = data.join("");
    }

    if (buttonValue === "AC") {
      deleteEverythingFromScreen();
    }

    if (Number(buttonValue) === 0 && screen.innerText.startsWith("0.")) {
      screen.innerText += buttonValue;
    }
    if (!isNaN(Number(buttonValue))) {
      screen.innerText = buttonValue;
      data.push(screen.innerText);
      screen.innerText = data.join("");
    }
    if (/[\/*\-+]/.test(buttonValue)) {
      if (data.slice(-1)[0] === ".") {
        data.pop();
      }
      buttonValue === "*"
        ? (buttonValue = "x")
        : buttonValue === "/"
        ? (buttonValue = "÷")
        : buttonValue;

      data.push(buttonValue);
      screen.innerText = data.join("");
    }
    if (buttonValue === "minus") {
      toggleSign();
    }

    if (buttonValue === ".") {
      canUserAddDot();
    }

    if (buttonValue === "=") {
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
          console.log(result);
          displayResult(replacedArray, result);
          screen.innerText =
            result === Infinity
              ? "You cannot divide by zero. Press AC"
              : result;
          // divideByZero(screen, result);
          data = [];
          data.push(result);
        }
      } catch (e) {
        screen.innerText = `${e.name} press AC`;
      }
    }

    function areYouDivindingByZero(array) {
      for (let i = 0; i < array.length - 2; i++) {
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
      for (let i = 0; i < array.length - 2; i++) {
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

    if (buttonValue === "%") {
      screen.innerText = screen.innerText / 100;
    }

    if (buttonValue === "DE") {
      deteLastEntry();
    }
    function insertOpeningParenthesis() {
      if (buttonValue === "(") {
        let isOpenparenthesis = true;
        for (let i = data.length - 1; i >= 0; i--) {
          if (/^\d$/.test(data[i])) {
            isOpenparenthesis = false;
            break;
          }
          if (data[i] === ")") {
            isOpenparenthesis = false;
            break;
          }
          if (/[\/*\-+]/.test(data[i])) {
            break;
          }
        }
        if (isOpenparenthesis) {
          data.push("(");
        }
        screen.innerText = data.join("");
      }

    }
  });
});

function deteLastEntry() {
  let newArray = data.slice(0, -1);
  screen.innerText = newArray.join("");
  data = newArray;
  if (screen.innerText === "") {
    screen.innerText = 0;
  }
}

function canUserAddDot() {
  var dotAllowed = true;
  for (var i = data.length - 1; i >= 0; i--) {
    console.log("data > " + data[i]);
    if (data[i] === ".") {
      dotAllowed = false;
      break;
    } else if (/[\/*\-+]/.test(data[i])) {
      break;
    }
  }
  if (dotAllowed) {
    if (data.length == 0) {
      data.push("0");
    } else if (/[\/*\-+]/.test(data[data.length - 1])) {
      data.push("0");
    }
    data.push(".");
  }
  screen.innerText = data.join(" ");
}

function deleteEverythingFromScreen() {
  screen.innerText = "";
  data = [];
  screen.innerText = 0;
}

function toggleSign() {
  let currentExpression = data.join("");
  let reversedExpression = currentExpression.split("").reverse().join("");
  let match = reversedExpression.match(/(\d+(\.\d+)?)|(\D+)/); // Match a number or non-digit
  // debugger

  if (match) {
    let start = currentExpression.length - match[0].length;
    let end = currentExpression.length;
    let currentValue = Number(match[0]);

    if (!isNaN(currentValue)) {
      // If it's a number, toggle its sign
      currentValue = -currentValue;
      data = data
        .slice(0, start)
        .concat(currentValue.toString().split(""), data.slice(end));
      screen.innerText = data.join("");
    }
  }
}
