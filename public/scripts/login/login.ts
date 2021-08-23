//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")
const form = <HTMLElement>document.querySelector("#form-login")

btnReturn.addEventListener("click", returnHomePage)
form.addEventListener("submit", enterToMainStores)


async function enterToMainStores(ev){
    ev.preventDefault()
    let {email, password} = ev.target.elements
    email = email.value
    password = password.value

    //verificar si es Admin
}


function returnHomePage() {
    window.location.href = 'index.html'
}