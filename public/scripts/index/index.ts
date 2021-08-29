//btn
const btnRegister = <HTMLElement>document.querySelector("#btn-register")
const btnLogin = <HTMLElement>document.querySelector("#btn-login")

//addEventListener
btnRegister.addEventListener("click", goRegisterPage)
btnLogin.addEventListener("click", goLoginPage)

function goRegisterPage() {
    try {
        const location = window.location.origin
        window.location.replace(`${location}/register.html`)
    } catch (e) { alert(e) }
    // window.location.href = 'register.html'
}

function goLoginPage() {
    try {
        const location = window.location.origin
        window.location.replace(`${location}/login.html`)
    } catch (e) { alert(e) }
    // window.location.href = 'login.html'
}

