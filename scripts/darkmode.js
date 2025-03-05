let rootElm = document.documentElement;
let switchElm = document.querySelector("#switch");
let isDarkMode = readFromLocalStorage("isDarkMode")
let userPref =  window.matchMedia("(prefers-color-scheme: dark)").matches

let darkState = null

if(isDarkMode == null || isDarkMode == undefined) {
    darkState = userPref;
} else {
    darkState = isDarkMode;
}

if (darkState) {
    switchElm.checked = true
    rootElm.setAttribute("data-dark", switchElm.checked)
} else {
    switchElm.checked = false
    rootElm.setAttribute("data-dark", switchElm.checked)
}

console.log(switchElm);




switchElm.addEventListener("change", () => {
    console.log(switchElm.checked);
    if (switchElm.checked) {
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveTolocalStorage("isDarkMode", switchElm.checked)
    } else {
        saveTolocalStorage("isDarkMode", switchElm.checked)
        rootElm.setAttribute("data-dark", switchElm.checked)
    } 
})
console.log(rootElm);

