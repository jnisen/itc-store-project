//btn
var btnRegister = document.querySelector("#btn-register");
var btnLogin = document.querySelector("#btn-login");
//addEventListener
btnRegister.addEventListener("click", goRegisterPage);
btnLogin.addEventListener("click", goLoginPage);
function goRegisterPage() {
    window.location.href = 'register.html';
}
function goLoginPage() {
    window.location.href = 'login.html';
}
