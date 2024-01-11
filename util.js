export function togglesClearHistoryButton(element, btn) {
    btn.classList.toggle("display", element.childElementCount > 0);
  }

  export function createHistoryList(array, element, history) {
    array.forEach((entry) => {
      history.push(entry);
      element.innerHTML += `<li> ${entry.join(" ")}</li>`;
      if (element.childElementCount > 10) {
        element.firstElementChild.remove();
      }
    });
  }