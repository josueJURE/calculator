const output = document.querySelector(".output");
const btns = document.querySelectorAll(".child");
let screen = Array.from(document.querySelectorAll(".screen"))[0];

let operator = ''
let data = [];

btns.forEach(btn => {
    btn.addEventListener("click", function(e) {
        let buttonText = e.target.innerText;
        console.log(buttonText)
        screen.innerText = buttonText;

        if(buttonText === "AC") {
            output.innerText = "";
            data = [];
            operator = undefined
        }
    })
});



