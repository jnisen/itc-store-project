"use strict";
exports.__esModule = true;
exports.Users = exports.User = void 0;
var fs = require("fs");
var path = require("path");
var allUsersJson = path.resolve(__dirname, "./data/users.json");
var readAllUsers = function () {
    try {
        var users = fs.readFileSync(allUsersJson);
        return JSON.parse(users);
    }
    catch (error) {
        console.error(error);
    }
};
var User = /** @class */ (function () {
    function User(email, role, password, username) {
        this.email = email;
        this.role = role;
        this.password = password;
        this.username = username;
        this.cart = [];
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
        this.allUsers = readAllUsers();
    }
    Users.prototype.addNewUser = function (user) {
        this.allUsers.push(user);
        this.writeAllUsers();
    };
    Users.prototype.writeAllUsers = function () {
        fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    };
    return Users;
}());
exports.Users = Users;
