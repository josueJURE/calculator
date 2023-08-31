const btns = document.querySelectorAll("[data-value]");
let screen = document.querySelector("[data-screen]");
const operators = document.querySelectorAll("[data-operator]");

let x = "";
let data = [];
let digit;

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonValue = e.target.dataset.value;

    if (buttonValue === "AC") {
      screen.innerText = "";
      data = [];
      x = undefined;
    } if (Number(buttonValue) === 0 && screen.innerText.startsWith("0.") ) {
        screen.innerText += buttonValue;
      
    } if (!isNaN(Number(buttonValue)) || /[\/x\-+]/.test(buttonValue)) {
      screen.innerText += buttonValue;
      data.push(screen.innerText);
    } if (buttonValue === "+/-") {
      digit = parseFloat(screen.innerText);
      console.log(screen.innerText);
      screen.innerText = -digit; // Toggle the sign of the digit
      // debugger;
    } if (buttonValue === ".") {
      if (!screen.innerText.includes(".")) {
        screen.innerText += ".";
      }
    } if (buttonValue === "=") {
      screen.innerText = new Function("return " + data.slice(-1).join(" "))();
      console.log(data);
    } if (buttonValue === "%") {
      screen.innerText = screen.innerText / 100;
      console.log("josué");
    }
  });
});
