const btns = document.querySelectorAll("[data-child]");
let screen = document.querySelector("[data-screen]");
const operators = document.querySelectorAll("[data-operator]");

console.log(operators)



let x = "";
let data = [];
let digit;

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let buttonText = e.target.innerText;

    if (buttonText === "AC") {
      screen.innerText = "";
      data = [];
      x = undefined;
    } else if (!isNaN(buttonText) || /[\/x\-+]/.test(buttonText)
    ) {
      screen.innerText += buttonText;
    } else if (buttonText === "+/-") {
      digit = parseFloat(screen.innerText);
      screen.innerText = -digit; // Toggle the sign of the digit
    } else if (buttonText === ".") {
        if(!screen.innerText.includes("."))
        screen.innerText += "."
    }
  });
});









