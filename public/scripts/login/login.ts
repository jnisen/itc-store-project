//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")

btnReturn.addEventListener("click", returnHomePage)

function returnHomePage() {
    window.location.href = 'index.html'
}