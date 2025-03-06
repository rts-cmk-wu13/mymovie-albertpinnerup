let footerSection = document.createElement("section");
footerSection.className = "footer"

let darkMode = readFromLocalStorage("isDarkMode");


function initialseFooter() {


    if(darkMode == false) {
        footerSection.innerHTML = `
        <a href="index.html"><img src="img/reel.svg" alt=""></a>
        <a href="#"><img src="img/ticket.svg" alt=""></a>
        <a href="#"><img src="img/bookmark.svg" alt=""></a>
    `
        document.querySelector("footer").append(footerSection)
    } else {
        footerSection.innerHTML = `
        <a href="index.html">hej</a>
        <p>med</p>
        <p>dig</p>
    `
        document.querySelector("footer").append(footerSection)
    }
}

initialseFooter()


switchElm.addEventListener("change", () => {
    console.log(switchElm.checked);
    if (switchElm.checked) {
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveTolocalStorage("isDarkMode", switchElm.checked)
        footerSection.innerHTML = `
        <a href="index.html">hej</a>
        <p>med</p>
        <p>dig</p>
    `
        document.querySelector("footer").append(footerSection)
    } else {
        saveTolocalStorage("isDarkMode", switchElm.checked)
        rootElm.setAttribute("data-dark", switchElm.checked)

        footerSection.innerHTML = `
        <a href="index.html"><img src="img/reel.svg" alt=""></a>
        <p>med</p>
        <p>dig</p>
    `
        document.querySelector("footer").append(footerSection)
    }
})