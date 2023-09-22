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
          console.log("last element in array " + data[i]);
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
      screen.innerText = "";
      data = [];
      screen.innerText = 0;
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
        console.debug(". removed");
        data.pop();
      }
      data.push(buttonValue);
      screen.innerText = data.join("");
    }
    if (buttonValue === "minus") {
      let currentValue = data[data.length - 1];
      if (currentValue === undefined) return;
      let toggledValue = -currentValue;
      screen.innerText = toggledValue; // Update the screen
      // Update the value in the data array
      data[data.length - 1] = toggledValue;
      console.log(data);
    }

    if (buttonValue === ".") {
      var dotAllowed = true;
      for (var i = data.length - 1; i >= 0; i--) {
        console.log("data > " + data[i]);
        if (data[i] === ".") {
          dotAllowed = false;
          break;
        } else if (/[\/*\-+]/.test(data[i])) {
          break;
        }
        debugger;
      }
      if (dotAllowed) {
        if (data.length == 0) {
          data.push("0");
        } else if (/[\/*\-+]/.test(data[data.length - 1])) {
          data.push("0");
        }
        data.push(".");
      }
      console.log(data);

      screen.innerText = data.join("");
    }

    if (buttonValue === "=") {
      try {
        let result = eval(data.join(""));
        displayResult(data, result);
        divideByZero(screen, result);
      } catch (e) {
        screen.innerText = `${e.name} press AC`;
      }
    }

    function divideByZero(display, outcome) {
      outcome === Infinity
        ? (display.innerText = "Math Error. Cannot divide by zero")
        : (display.innerText = outcome);
    }
    function displayResult(array, outcome) {
      array = [];
      array.push(outcome);
      
    }

    if (buttonValue === "%") {
      screen.innerText = screen.innerText / 100;
      console.log("josué");
    }

    if (buttonValue === "DE") {
      let newArray = data.slice(0, -1);
      screen.innerText = newArray.join("");
      data = newArray;
      if (screen.innerText === "") {
        screen.innerText = 0;
      }
    }
  });
});
