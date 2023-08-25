const output = document.querySelector(".output");
const btns = document.querySelectorAll(".child");

let operator = ''
let data = [];

btns.forEach(btn => {
    btn.addEventListener("click", function(e) {
        console.log("josue")
        let buttonText = e.target.innerText;

        if(buttonText === "AC") {
            output.innerText = "";
            data = [];
            operator = undefined
        }
    })
});



