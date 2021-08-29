//btn
const btnRegister = <HTMLElement>document.querySelector("#btn-register")
const btnLogin = <HTMLElement>document.querySelector("#btn-login")

//addEventListener
btnRegister.addEventListener("click", goRegisterPage)
btnLogin.addEventListener("click", goLoginPage)

function goRegisterPage() {
    const location = window.location.origin
    window.location.replace(`${location}/register.html`)
    // window.location.href = 'register.html'
}

function goLoginPage() {

    const location = window.location.origin
    window.location.replace(`${location}/login.html`)
    // window.location.href = 'login.html'
}

