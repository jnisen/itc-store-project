"use strict";
exports.__esModule = true;
exports.Stores = exports.Store = exports.readAllUsers = void 0;
var fs = require("fs");
var path = require("path");
var allStoresJSON = path.resolve(__dirname, "./data/stores.json");
var uuidv4 = require("uuid").v4;
exports.readAllUsers = function () {
    try {
        var stores = fs.readFileSync(allStoresJSON);
        return JSON.parse(stores);
    }
    catch (error) {
        console.error(error);
    }
};
//prefijada
var Store = /** @class */ (function () {
    function Store() {
    }
    return Store;
}());
exports.Store = Store;
var Stores = /** @class */ (function () {
    function Stores() {
        this.allStores = allStoresJSON();
    }
    Stores.prototype.addNewProduct = function (product, section) {
        var store = this.allStores.find(function (store) { return store.section = section; });
        store.products.push(product);
        this.writeAllUsers();
    };
    Stores.prototype.writeAllUsers = function () {
        fs.writeFileSync(allStoresJSON, JSON.stringify(this.allStores));
    };
    return Stores;
}());
exports.Stores = Stores;
