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
    Users.prototype.buyCart = function (idUser) {
        var user = this.findUserById(idUser);
        if (user.cartBuy === undefined)
            user.cartBuy = [user.cart];
        else
            user.cartBuy.push(user.cart);
        user.cart = [];
        this.writeAllUsers();
    };
    Users.prototype.editCar = function (idUser, body, id) {
        var user = this.findUserById(idUser);
        var findProductOnCart = user.cart.find(function (product) { return product.id === id; });
        findProductOnCart.number = body.number;
        findProductOnCart.total = body.number * findProductOnCart.price;
        this.writeAllUsers();
        return this.findCartByStore(body.store, idUser);
    };
    Users.prototype.deleteProductOnCart = function (idProduct, idUser, store) {
        var user = this.findUserById(idUser);
        var index = user.cart.findIndex(function (product) { return product.id === idProduct; });
        user.cart.splice(index, 1);
        this.writeAllUsers();
        return this.findCartByStore(store, idUser);
    };
    Users.prototype.findUserById = function (id) {
        var user = this.allUsers.find(function (user) { return user.id === id; });
        return user;
    };
    Users.prototype.findCartByStore = function (store, id) {
        var user = this.findUserById(id);
        var seeCart = user.cart.filter(function (user) { return user.store === store; });
        return seeCart;
    };
    Users.prototype.writeAllUsers = function () {
        fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    };
    return Users;
}());
exports.Users = Users;
