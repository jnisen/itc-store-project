//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")
const form = <HTMLElement>document.querySelector("#form-login")

btnReturn.addEventListener("click", returnHomePage)
form.addEventListener("submit", enterToMainStores)


async function enterToMainStores(ev) {
    ev.preventDefault()
    try {
        let { email, password, repassword } = ev.target.elements
        email = email.value
        password = password.value
        repassword = repassword.value

        if (password !== repassword) throw new Error("Your password and repassword are not the same")

        const user = {
            email: email,
            password: password
        }

        const response: any = await enterPromiseLogin(user)
        const { ok } = response
        alert(ok)

        window.location.href = `stores.html?email=${email}`
    } catch (e) {
        alert(e)
    }
}


function returnHomePage() {
    window.location.href = 'index.html'
}