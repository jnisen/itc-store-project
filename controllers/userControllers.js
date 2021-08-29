"use strict";
exports.__esModule = true;
exports.seeCartStore = exports.buyCart = exports.deleteProductOnCart = exports.editCartNow = exports.addCartForNow = exports.getEmail = exports.addSection = exports.sendCookie = exports.addNewUser = void 0;
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
    if (role === 'public')
        user.cart = [];
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
    allUsers.addCart(req.id, req.body);
    res.send({ ok: true });
}
exports.addCartForNow = addCartForNow;
function editCartNow(req, res) {
    var allUsers = new user_1.Users();
    var cart = allUsers.editCar(req.id, req.body, req.params.idProduct);
    res.send(cart);
}
exports.editCartNow = editCartNow;
function deleteProductOnCart(req, res) {
    var allUsers = new user_1.Users();
    var _a = req.params, id = _a.id, store = _a.store;
    var cart = allUsers.deleteProductOnCart(id, req.id, store);
    res.send({ ok: "Delete Product", cart: cart });
}
exports.deleteProductOnCart = deleteProductOnCart;
function buyCart(req, res) {
    var allUsers = new user_1.Users();
    var user = allUsers.findUserById(req.id);
    var date = new Date();
    var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var newCart = {
        id: uuidv4(),
        date: dateString,
        cart: user.cart,
        store: req.params.store
    };
    var allProducts = new products_1.Products();
    allProducts.editProductCart(user.cart);
    carts_1.addCart(newCart);
    store_1.removeStock(user.cart, user.store);
    allUsers.buyCart(req.id);
    res.send({ "ok": "Congrats for your buy 🤩 " });
}
exports.buyCart = buyCart;
function seeCartStore(req, res) {
    var allUsers = new user_1.Users();
    var cart = allUsers.findCartByStore(req.params.store, req.id);
    res.send({ cart: cart });
}
exports.seeCartStore = seeCartStore;
