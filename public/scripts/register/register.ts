//btn
const btnReturn = <HTMLElement>document.querySelector("#a-return")
const form = <HTMLElement>document.querySelector("#form-register")


btnReturn.addEventListener("click", returnHomePage)
form.addEventListener("submit", addNewUser)


async function addNewUser(ev) {
    ev.preventDefault();
    try {
        let { username, email, password, repassword } = ev.target.elements
        username = isNaN(username.value) ? username.value : parseInt(username.value)
        email = email.value
        password = password.value
        repassword = repassword.value

        if(password !== repassword) throw new Error("Your password and repassword are not the same")

        const newUser = {
            username: username,
            email: email,
            password: password
        }


        const response: any = await addRegisterPromise(newUser)
        const { ok } = response
        swal(`${ok}`,'now you can log in', "success")
        
        const btnSwalButton = <HTMLButtonElement>document.querySelector(".swal-button")
        btnSwalButton.addEventListener("click", goToLoginPage)

    } catch (e) {
        alert(e)
    }
}


function goToLoginPage(){
    window.location.href = 'login.html'; 
}

function returnHomePage() {
    window.location.href = 'index.html'
}