document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll("[data-value]");
    const historyElement = document.querySelector(".computation-history");
    // let screenElement = document.querySelector("[data-screenElement]") as HTMLElement;
    // const screenElement = document.querySelector("[data-screenElement]") as HTMLDivElement & { innerText: string} | {innerText: number};
    const screenElement = document.querySelector("[data-screen]");
    console.log(screenElement);
    const historyBtn = document.querySelector(".history-btn");
    const slidingPart = document.querySelector(".sliding-part");
    const computationHistoryParent = document.querySelector(".computation-history-parent");
    const operators = document.querySelectorAll("[data-operator]");
    const clearHistoryBtn = document.querySelector(".clear-history-btn");
    const minus = document.querySelector(".minus");
    console.log(minus);
    let currentExpression;
    clearHistoryBtn.addEventListener("click", () => {
        historyElement.innerHTML = "";
    });
    document.addEventListener("keydown", handleKeyPress);
    // Add this at the beginning of your script
    window.addEventListener("DOMContentLoaded", () => {
        const history = getHistoryFromLocalStorage();
        createHistoryList(history, historyElement);
    });
    function handleKeyPress(event) {
        const key = event.key;
        const button = document.querySelector(`[data-value="${key}"]`);
        if (button) {
            button.click(); // Trigger the click event for the corresponding button
        }
        if (event.code === "Backspace") {
            let newArray = data.slice(ZERO, -1);
            screenElement.innerText = newArray.join("");
            data = newArray;
            if (screenElement.innerText === "") {
                screenElement.innerText = String(ZERO);
            }
        }
        if (event.code === "Enter") {
            userClicksOnEqualButton("=");
        }
    }
    const operatorRegex = /[\/*\-+]/;
    const ZERO = 0;
    const ZERO_DOT = "0.";
    const HISTORY_LIMIT = 10;
    // const history = [];
    historyBtn.addEventListener("click", () => {
        slidingPart.classList.toggle("slide");
        computationHistoryParent.classList.toggle("visility");
    });
    let data = [];
    // let data: string[] = [];
    btns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            let buttonValue = e.target && e.target.dataset.value;
            insertOpeningParenthesis(String(buttonValue));
            insertClosingParenthesis(String(buttonValue));
            deleteEverythingFromScreen(String(buttonValue));
            toggleSign(buttonValue);
            canUserAddDot(String(buttonValue));
            userClicksOnEqualButton(String(buttonValue));
            handlingZeroFollowedByAdecimal(String(buttonValue));
            removesDecimalPointIfPrecededByAnOperator(String(buttonValue));
            handleNumberButton(String(buttonValue));
            deteLastEntry(String(buttonValue));
            convertToPercentage(String(buttonValue));
        });
    });
    // forEach ends & functions creations begins
    function convertToPercentage(button) {
        if (button === "%") {
            currentExpression = Number(data.join(""));
            currentExpression = currentExpression / 100;
            data = [currentExpression];
            console.log(data);
            screenElement.innerText = String(currentExpression);
        }
    }
    function deteLastEntry(button) {
        if (button === "DE") {
            let newArray = data.slice(ZERO, -1);
            screenElement.innerText = newArray.join("");
            data = newArray;
            if (screenElement.innerText === "") {
                screenElement.innerText = String(ZERO);
            }
        }
    }
    function canUserAddDot(button) {
        if (button === ".") {
            var dotAllowed = true;
            for (var i = data.length - 1; i >= ZERO; i--) {
                if (data[i] === ".") {
                    dotAllowed = false;
                    break;
                }
                else if (operatorRegex.test(String(data[i]))) {
                    break;
                }
            }
            if (dotAllowed) {
                if (data.length == ZERO) {
                    data.push("0");
                }
                else if (operatorRegex.test(String(data[data.length - 1]))) {
                    data.push("0");
                }
                data.push(".");
            }
            screenElement.innerText = data.join("");
        }
    }
    function deleteEverythingFromScreen(button) {
        if (button === "AC") {
            screenElement.innerText = "";
            data = [];
            screenElement.innerText = String(ZERO);
        }
    }
    // function toggleSign(button) {
    //   if (button === "minus") {
    //     console.log(data[0])
    //     currentExpression = data.join("");
    //     console.log(currentExpression)
    //     let reversedExpression = currentExpression.split("").join("");
    //     console.log(reversedExpression)
    //     let match = reversedExpression.match(/(\d+(\.\d+)?)|(\D+)/); // Match a number or non-digit
    //     if (match) {
    //       let start = currentExpression.length - match[ZERO].length;
    //       let end = currentExpression.length;
    //       let currentValue = Number(match[ZERO]);
    //       if (!isNaN(currentValue)) {
    //         currentValue = -currentValue;
    //         data = data
    //           .slice(ZERO, start)
    //           .concat(currentValue.toString().split(""), data.slice(end));
    //         screenElement.innerText = data.join("");
    //       }
    //     }
    //   }
    // }
    // The unshift() method of Array instances adds the specified elements to the beginning
    // of an array and returns the new length of the array.
    // The shift() method of Array instances removes the first element from an array and returns
    // that removed element. This method changes the length of the array.
    minus.addEventListener("click", toggleSign);
    // function toggleSign(button) {
    //   let value = Number(data.join(""))
    //   if (button === "minus") {
    //     if (value > 0) {
    //       value = -value
    //       console.log(value);
    //       screenElement.innerText = value;
    //     } if (value < 0) {
    //       console.log("smaller than zero")
    //       value = value * -1
    //       console.log(value)
    //       screenElement.innerText = value;
    //     }
    //     // screenElement.innerText = value;
    //     data = [value]
    //   }
    // }
    function toggleSign(button) {
        let value = Number(data.join(""));
        if (button === "minus") {
            if (value > 0) {
                value = -value;
            }
            else if (value < 0) {
                value = value * -1;
            }
            screenElement.innerText = String(value);
            data = [value];
        }
    }
    function insertOpeningParenthesis(button) {
        if (button === "(") {
            let isOpenparenthesis = true;
            for (let i = data.length - 1; i >= ZERO; i--) {
                if (/^\d$/.test(String(data[i]))) {
                    isOpenparenthesis = false;
                    break;
                }
                if (data[i] === ")") {
                    isOpenparenthesis = false;
                    break;
                }
                if (operatorRegex.test(String(data[i]))) {
                    break;
                }
            }
            if (isOpenparenthesis) {
                data.push("(");
            }
            screenElement.innerText = data.join("");
        }
    }
    function insertClosingParenthesis(button) {
        if (button === ")") {
            data.push(")");
            screenElement.innerText = data.join("");
        }
    }
    function handlingZeroFollowedByAdecimal(button) {
        if (Number(button) === ZERO && screenElement.innerText.startsWith(ZERO_DOT)) {
            screenElement.innerText += button;
        }
    }
    function removesDecimalPointIfPrecededByAnOperator(button) {
        if (operatorRegex.test(button)) {
            if (data.slice(-1)[ZERO] === ".") {
                data.pop();
            }
            button === "*" ? (button = "x") : button === "/" ? (button = "÷") : button;
            data.push(button);
            screenElement.innerText = data.join("");
        }
    }
    function handleNumberButton(button) {
        if (!isNaN(Number(button))) {
            screenElement.innerText = button;
            data.push(screenElement.innerText);
            screenElement.innerText = data.join("");
        }
    }
    function userClicksOnEqualButton(button) {
        if (button === "=") {
            try {
                const replacedArray = data.map((item) => item === "x" ? "*" : item === "÷" ? "/" : String(item));
                if (areYouDividingdZeroByZero(replacedArray)) {
                    screenElement.innerText = "0÷0 is an invalid format. Press AC";
                }
                else {
                    let result = eval(replacedArray.join(""));
                    const history = getHistoryFromLocalStorage();
                    history.push([...replacedArray, "=", result].join("").split(",")); // Used slice() at first. But slice() is not sufficient because it only creates a shallow copy of the array, and modifications to the new array will still affect the original array. The spread syntax ([...replacedArray]), which creates a shallow copy as well, is a concise way to create a new array with the same elements as the existing array. While ensuring that modifications to historyEntries do not affect replacedArray, and vice versa
                    replacedArray.splice(replacedArray.length, 0, "=", result);
                    displayResult(replacedArray, result);
                    screenElement.innerText = !Number.isFinite(result)
                        ? "You cannot divide by zero. Press AC"
                        : result;
                    data = [];
                    data.push(result);
                    setHistoryToLocalStorage(history);
                    createHistoryList(history, historyElement);
                    togglesClearHistoryButton(historyElement);
                }
            }
            catch (e) { // unknown is safer than any because TypeScript forces you to narrow the type before using it (e.g., with instanceof checks).This prevents accidental assumptions about the error structure.
                if (e instanceof Error) {
                    console.error(e.message);
                    screenElement.innerText = `${e.name} press AC`;
                }
                else {
                    console.error("An unknown error occurred:", e);
                    screenElement.innerText = "Error press AC";
                }
            }
        }
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
    function createHistoryList(entries, element) {
        element.innerHTML = "";
        entries
            .slice(-10)
            .reverse()
            .forEach((entry) => {
            const listItem = document.createElement("li");
            listItem.textContent = entry;
            element.appendChild(listItem);
        });
    }
    function getHistoryFromLocalStorage() {
        return JSON.parse(localStorage.getItem("calculatorHistory") || "[]");
    }
    function setHistoryToLocalStorage(history) {
        localStorage.setItem("calculatorHistory", JSON.stringify(history.slice(-10)));
    }
    clearHistoryBtn.addEventListener("click", () => {
        historyElement.innerHTML = "";
        clearHistoryInLocalStorage();
        togglesClearHistoryButton(historyElement);
    });
    function clearHistoryInLocalStorage() {
        localStorage.removeItem("calculatorHistory");
    }
    function togglesClearHistoryButton(element) {
        clearHistoryBtn.classList.toggle("display", element.childElementCount > 0);
    }
    // functions creations ends
});
