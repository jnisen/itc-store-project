"use strict";
exports.__esModule = true;
exports.writeAllCarts = exports.addCart = exports.readAllStores = exports.Cart = void 0;
var fs = require("fs");
var path = require("path");
var allStoresJSON = path.resolve(__dirname, "./data/carts.json");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    return Cart;
}());
exports.Cart = Cart;
exports.readAllStores = function () {
    try {
        var stores = fs.readFileSync(allStoresJSON);
        return JSON.parse(stores);
    }
    catch (error) {
        console.error(error);
    }
};
function addCart(newCart) {
    writeAllCarts(newCart);
}
exports.addCart = addCart;
function writeAllCarts(writeToJSON) {
    fs.writeFileSync(allStoresJSON, JSON.stringify(writeToJSON));
}
exports.writeAllCarts = writeAllCarts;
