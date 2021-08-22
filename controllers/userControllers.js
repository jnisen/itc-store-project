"use strict";
exports.__esModule = true;
exports.addNewUser = void 0;
var user_1 = require("../models/user");
function addNewUser(req, res) {
    var user = new user_1.User(req.body.email, 'admin', req.body.password, req.body.username);
    var allUsers = new user_1.Users();
    allUsers.addNewUser(user);
    res.send({ ok: "User Created" });
}
exports.addNewUser = addNewUser;
