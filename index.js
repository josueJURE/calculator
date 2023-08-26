const btns = document.querySelectorAll("[data-child]");
let screen = document.querySelector("[data-screen]");

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



