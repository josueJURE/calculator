const btns = document.querySelectorAll("[data-value]");
let screen = document.querySelector("[data-screen]");
const operators = document.querySelectorAll("[data-operator]");

let data = [];

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonValue = e.target.dataset.value;

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
      // console.warn("Hello");
      console.debug(`Operator pressed: ${buttonValue}, data is ${data}`);
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

    //Number.isFinite(value)
    // When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted.
    if (buttonValue === ".") {
      console.log("len " + data.length);
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
      console.log(data);

      screen.innerText = data.join("");
    }

    if (buttonValue === "=") {
      // debugger
      let result = eval(data.join(""));
      console.log(result);
      console.log(data);
      data = [];
      data.push(result);
      screen.innerText = result;
      console.log(result);
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
