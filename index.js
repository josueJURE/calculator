const btns = document.querySelectorAll("[data-child]");
let screen = document.querySelector("[data-screen]");

let operator = "";
let data = [];
let digit;

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonText = e.target.innerText;

    if (buttonText === "AC") {
      screen.innerText = "";
      data = [];
      operator = undefined;
    } else if (!isNaN(buttonText)) {
      screen.innerText += buttonText;
    } else if (buttonText === "+/-") {
      digit = parseFloat(screen.innerText);
      screen.innerText = -digit; // Toggle the sign of the digit
    }
  });
});









