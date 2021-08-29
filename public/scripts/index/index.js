//btn
var btnRegister = document.querySelector("#btn-register");
var btnLogin = document.querySelector("#btn-login");
//addEventListener
btnRegister.addEventListener("click", goRegisterPage);
btnLogin.addEventListener("click", goLoginPage);
function goRegisterPage() {
    try {
        var location = window.location.origin;
        window.location.replace(location + "/register.html");
    }
    catch (e) {
        alert(e);
    }
    // window.location.href = 'register.html'
}
function goLoginPage() {
    try {
        var location = window.location.origin;
        window.location.replace(location + "/login.html");
    }
    catch (e) {
        alert(e);
    }
    // window.location.href = 'login.html'
}
