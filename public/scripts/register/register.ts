//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")
const form = <HTMLElement>document.querySelector("#form-register")

btnReturn.addEventListener("click", returnHomePage)
form.addEventListener("submit", addNewUser)



async function addNewUser(ev) {
    ev.preventDefault();
    let { username, email, password } = ev.target.elements
    username = isNaN(username.value) ? username.value : parseInt(username.value)
    email = email.value
    password = password.value

    const newUser = {
        username: username,
        email: email,
        password: password,
    }

    const response: any = await addRegisterPromise(newUser)
    console.log(response)
    // const { ok } = response
    // alert(ok)



}



function returnHomePage() {
    window.location.href = 'index.html'
}