"use strict";
exports.__esModule = true;
exports.buyCart = exports.deleteProductOnCart = exports.getAllCart = exports.editCartNow = exports.addCartForNow = exports.getEmail = exports.addSection = exports.sendCookie = exports.addNewUser = void 0;
var user_1 = require("../models/user");
var products_1 = require("../models/products");
var carts_1 = require("../models/carts");
var store_1 = require("../models/store");
var secret_1 = require("./secrets/secret");
var uuidv4 = require("uuid").v4;
var jwt = require('jwt-simple');
var adminsArray = ['jnisen@gmail.com', 'leo@gmail.com', 'salmon@gmail.com'];
function addNewUser(req, res) {
    var user = new user_1.User(req.body.username, req.body.email, req.body.password);
    console.log(adminsArray);
    var role = adminsArray.includes(req.body.email) ? user.role = 'admin' : user.role = 'public';
    if (role === 'public') {
        user.cart = [];
        user.cartBuy = [];
    }
    var allUsers = new user_1.Users();
    allUsers.addNewUser(user);
    res.send({ ok: "Hi " + req.body.username + " \uD83D\uDE03" });
}
exports.addNewUser = addNewUser;
function sendCookie(req, res) {
    try {
        var allUsers = user_1.readAllUsers();
        var findUser = allUsers.find(function (user) { return (user.email === req.body.email); });
        var idUser = findUser.id;
        var tokenUser = jwt.encode(idUser, secret_1.secret);
        res.cookie('CookieName', tokenUser, { maxAge: 30000000, httpOnly: true });
        res.send({ ok: "Welcome " + findUser.username, user: findUser });
    }
    catch (e) {
        res.status(500).send({ error: "" + e.message });
    }
}
exports.sendCookie = sendCookie;
function addSection(req, res) {
    var allUsers = new user_1.Users();
    var user = allUsers.findUserById(req.id);
    user.store = req.body.store;
    allUsers.writeAllUsers();
    res.send({ ok: "Welcome to the store " + req.body.store });
}
exports.addSection = addSection;
function getEmail(req, res) {
    var allUsers = new user_1.Users();
    var user = allUsers.findUserById(req.id);
    res.send({ user: user });
}
exports.getEmail = getEmail;
function addCartForNow(req, res) {
    var allUsers = new user_1.Users();
    allUsers.addCart(req.params.idUser, req.body);
    console.log(req.body);
    res.send({ ok: "added" });
}
exports.addCartForNow = addCartForNow;
function editCartNow(req, res) {
    var allUsers = new user_1.Users();
    allUsers.editCar(req.params.idUser, req.body, req.params.idProduct);
    res.send({ ok: "edit" });
}
exports.editCartNow = editCartNow;
function getAllCart(req, res) {
    var allUsers = new user_1.Users();
    var user = allUsers.findUserById(req.params.idUser);
    res.send({ cart: user.cart });
}
exports.getAllCart = getAllCart;
function deleteProductOnCart(req, res) {
    var allUsers = new user_1.Users();
    var _a = req.params, id = _a.id, idUser = _a.idUser;
    var user = allUsers.deleteProductOnCart(id, idUser);
    res.send({ ok: "Delete Product", cart: user.cart });
}
exports.deleteProductOnCart = deleteProductOnCart;
function buyCart(req, res) {
    var allUsers = new user_1.Users();
    var idUser = req.params.idUser;
    var user = allUsers.buyCart(idUser);
    var date = new Date();
    var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var newCart = [{
            id: uuidv4(),
            date: dateString,
            cart: user.cartBuy
        }];
    var allProducts = new products_1.Products();
    allProducts.editProductCart(user.cartBuy);
    carts_1.addCart(newCart);
    store_1.removeStock(user.cartBuy, user.store);
    res.send({ "ok": "Felicidades por su compra" });
}
exports.buyCart = buyCart;
