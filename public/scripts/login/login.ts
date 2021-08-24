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

        const loginUser = {
            email: email,
            password: password
        }

        const response: any = await enterPromiseLogin(loginUser)
        const {ok , user} = response

        alert(ok)
        
        if (user.store)  window.location.href = `main.html?email=${email}/${user.store}`
        else window.location.href = `stores.html?email=${email}`

    } catch (e) {
        alert(e)
    }
}


function returnHomePage() {
    window.location.href = 'index.html'
}