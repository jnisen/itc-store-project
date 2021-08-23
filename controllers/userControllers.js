"use strict";
exports.__esModule = true;
exports.addNewUser = void 0;
var user_1 = require("../models/user");
function addNewUser(req, res) {
    console.log(req.body);
    var user = new user_1.User(req.body.username, req.body.password, req.body.email, 'admin');
    //user.cart = []
    var allUsers = new user_1.Users();
    allUsers.addNewUser(user);
    res.send({ ok: "User Created" });
}
exports.addNewUser = addNewUser;
