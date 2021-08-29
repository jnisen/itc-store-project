//btn
var btnRegister = document.querySelector("#btn-register");
var btnLogin = document.querySelector("#btn-login");
//addEventListener
btnRegister.addEventListener("click", goRegisterPage);
btnLogin.addEventListener("click", goLoginPage);
function goRegisterPage() {
    var location = window.location.origin;
    window.location.replace(location + "/register.html");
    // window.location.href = 'register.html'
}
function goLoginPage() {
    var location = window.location.origin;
    window.location.replace(location + "/login.html");
    // window.location.href = 'login.html'
}
