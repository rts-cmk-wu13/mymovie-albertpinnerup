let footerSection = document.createElement("section");
footerSection.className = "footer"

let darkMode = readFromLocalStorage("isDarkMode");


function initialseFooter() {


    if(darkMode == false) {
        footerSection.innerHTML = `
        <a href="index.html"><img src="img/reel_light.svg" alt=""></a>
        <a href="#"><img src="img/ticket_light.svg" alt=""></a>
        <a href="#"><img src="img/bookmark_light.svg" alt=""></a>
    `
        document.querySelector("footer").append(footerSection)
    } else {
        footerSection.innerHTML = `
        <a href="index.html"><img src="img/reel_dark.svg" alt=""></a>
        <a href="#"><img src="img/ticket_dark.svg" alt=""></a>
        <a href="#"><img src="img/bookmark_dark.svg" alt=""></a>
    `
        document.querySelector("footer").append(footerSection)
    }
}

initialseFooter()


switchElm.addEventListener("change", () => {
    if (switchElm.checked) {
        rootElm.setAttribute("data-dark", switchElm.checked)
        saveTolocalStorage("isDarkMode", switchElm.checked)
        footerSection.innerHTML = `
        <a href="index.html"><img src="img/reel_dark.svg" alt=""></a>
        <a href="#"><img src="img/ticket_dark.svg" alt=""></a>
        <a href="#"><img src="img/bookmark_dark.svg" alt=""></a>
    `
        document.querySelector("footer").append(footerSection)
    } else {
        saveTolocalStorage("isDarkMode", switchElm.checked)
        rootElm.setAttribute("data-dark", switchElm.checked)

        footerSection.innerHTML = `
        <a href="index.html"><img src="img/reel_light.svg" alt=""></a>
        <a href="#"><img src="img/ticket_light.svg" alt=""></a>
        <a href="#"><img src="img/bookmark_light.svg" alt=""></a>
    `
        document.querySelector("footer").append(footerSection)
    }
})