"use strict";
exports.__esModule = true;
exports.writeAllCarts = exports.seeAllCartsStore = exports.addCart = exports.readAllCarts = exports.Cart = void 0;
var fs = require("fs");
var path = require("path");
var allCartsJSON = path.resolve(__dirname, "./data/carts.json");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    return Cart;
}());
exports.Cart = Cart;
exports.readAllCarts = function () {
    try {
        var allCarts = fs.readFileSync(allCartsJSON);
        return JSON.parse(allCarts);
    }
    catch (error) {
        console.error(error);
    }
};
function addCart(newCart) {
    var allCarts = exports.readAllCarts();
    allCarts.push(newCart);
    writeAllCarts(allCarts);
}
exports.addCart = addCart;
function seeAllCartsStore(store) {
    var allCarts = exports.readAllCarts();
    var carts = [];
    allCarts.forEach(function (cart) {
        cart.cart.forEach(function (cartsbuys) {
            carts.push(cartsbuys);
        });
    });
    return carts;
}
exports.seeAllCartsStore = seeAllCartsStore;
function writeAllCarts(writeToJSON) {
    fs.writeFileSync(allCartsJSON, JSON.stringify(writeToJSON));
}
exports.writeAllCarts = writeAllCarts;
