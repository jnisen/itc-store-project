"use strict";
exports.__esModule = true;
exports.Users = exports.User = exports.readAllUsers = void 0;
var fs = require("fs");
var path = require("path");
var allUsersJson = path.resolve(__dirname, "./data/users.json");
var uuidv4 = require("uuid").v4;
exports.readAllUsers = function () {
    try {
        var users = fs.readFileSync(allUsersJson);
        return JSON.parse(users);
    }
    catch (error) {
        console.error(error);
    }
};
var User = /** @class */ (function () {
    function User(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = uuidv4();
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
        this.allUsers = exports.readAllUsers();
    }
    Users.prototype.addCart = function (id, body) {
        var user = this.findUserById(id);
        user.cart.push(body);
        this.writeAllUsers();
    };
    Users.prototype.addNewUser = function (user) {
        this.allUsers.push(user);
        this.writeAllUsers();
    };
    Users.prototype.editCar = function (idUser, body, id) {
        var user = this.findUserById(idUser);
        var findProductOnCart = user.cart.find(function (product) { return product.id === id; });
        findProductOnCart.number = body.number;
        this.writeAllUsers();
    };
    Users.prototype.findUserById = function (id) {
        var user = this.allUsers.find(function (user) { return user.id === id; });
        return user;
    };
    Users.prototype.writeAllUsers = function () {
        fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    };
    return Users;
}());
exports.Users = Users;
