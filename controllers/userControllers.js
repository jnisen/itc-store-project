"use strict";
exports.__esModule = true;
exports.sendCookie = exports.addNewUser = void 0;
var user_1 = require("../models/user");
var secret_1 = require("./secrets/secret");
var jwt = require('jwt-simple');
function addNewUser(req, res) {
    console.log(req.body);
    var user = new user_1.User(req.body.username, req.body.email, req.body.password, 'admin');
    //user.cart = []
    var allUsers = new user_1.Users();
    allUsers.addNewUser(user);
    res.send({ ok: "Hi " + req.body.username + "!, now you can log in" });
}
exports.addNewUser = addNewUser;
function sendCookie(req, res) {
    try {
        var allUsers = user_1.readAllUsers(); //is necessary?
        var findUser = allUsers.find(function (user) { return (user.email === req.body.email); });
        var idUser = findUser.id;
        var tokenUser = jwt.encode(idUser, secret_1.secret);
        res.cookie('CookieName', tokenUser, { maxAge: 30000000, httpOnly: true });
        res.send({ ok: "Welcome " + findUser.username });
    }
    catch (e) {
        res.status(500).send({ error: "" + e.message });
    }
}
exports.sendCookie = sendCookie;
//repasswrod
//app.morgan('tiny')
// export function getCookie(req, res) {
//     try {
//         const { cookieName } = req.cookies
//         if (!cookieName) throw new Error("Nothing is on the cookie")
//         const decoded = jwt.decode(cookieName, secret);
//         res.send(decoded);
//     } catch (e) {
//         res.status(500).send({ error: `${e.message}` });
//     }
// };
