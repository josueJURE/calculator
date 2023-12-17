const btns = document.querySelectorAll("[data-value]");
let screen = document.querySelector("[data-screen]");
const operators = document.querySelectorAll("[data-operator]");

let data = [];

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonValue = e.target.dataset.value;
    // if (buttonValue === "(") {
    //   let isOpenParenthesis = true;
    //   for (let i = data.length - 1; i >= 0; i--) {
    //     if (/^\d$/.test(data[i])) { // Use /^\d$/ to match a single digit
    //       isOpenParenthesis = false;
    //       break; // Exit the loop as soon as a digit is found
    //     }
    //   }
    //   // Rest of your code...
    // }

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
      buttonValue === "*" ? buttonValue = "x" : buttonValue === "/" ? buttonValue = "÷" : buttonValue;
    
      data.push(buttonValue);
      screen.innerText = data.join("");
    }
    if (buttonValue === "minus") {
      toggleSign();
    }

    if (buttonValue === ".") {
      canUserAddDot();
    }

    // This is the = fuction
    if (buttonValue === "=") {
      try {
        const replacedArray = data.map((item) => (item === "x" ? "*" : item === "÷" ? "/" : item));
        let result = eval(replacedArray .join(""));
        if(result === NaN) {
          screen.innerText = "You cannot divide by Zero";
        }
        console.log(result)
        console.log(eval(replacedArray .join("")));
        displayResult(replacedArray, result);
        divideByZero(screen, result);
        zeroDivedByZero(screen, result)
        data = [];
        data.push(result)
      
      } catch (e) {
        screen.innerText = `${e.name} press AC`;
      }
    }

    // if(buttonValue === "÷") {
    //   try {

    //   }
    // }

    function divideByZero(display, outcome) {
      outcome === Infinity
        ? (display.innerText = "Math Error. Cannot divide by zero")
        : (display.innerText = outcome);
    }

    function zeroDivedByZero(display, outcome) {
      outcome === NaN
      ? (display.innerText = "Invalid format used. You cannot divided by zero" )
      : (display.innerText = outcome)
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
      data = data.slice(0, start).concat(currentValue.toString().split(""), data.slice(end));
      screen.innerText = data.join("");
    }
  }
}




