//btn
const btnRegister = <HTMLElement>document.querySelector("#btn-register")
const btnLogin = <HTMLElement>document.querySelector("#btn-login")

//addEventListener
btnRegister.addEventListener("click", goRegisterPage)
btnLogin.addEventListener("click", goLoginPage)

function goRegisterPage() {
    window.location.href = 'register.html'
}

function goLoginPage() {
    window.location.href = 'login.html'
}

