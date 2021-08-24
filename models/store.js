"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.deleteProductToStore = exports.writeAllUsers = exports.addProductToStore = exports.readAllStores = void 0;
var fs = require("fs");
var path = require("path");
var allStoresJSON = path.resolve(__dirname, "./data/stores.json");
var uuidv4 = require("uuid").v4;
exports.readAllStores = function () {
    try {
        var stores = fs.readFileSync(allStoresJSON);
        return JSON.parse(stores);
    }
    catch (error) {
        console.error(error);
    }
};
function addProductToStore(body) {
    var allStores = exports.readAllStores();
    var findStore = allStores.find(function (store) { return store.store === body.store; });
    var store = body.store, rest = __rest(body, ["store"]);
    if (findStore === undefined) {
        var newStore = {
            id: uuidv4(),
            store: body.store,
            allProducts: [rest]
        };
        allStores.push(newStore);
    }
    else {
        findStore.allProducts.push(rest);
    }
    writeAllUsers(allStores);
}
exports.addProductToStore = addProductToStore;
function writeAllUsers(writeToJSON) {
    fs.writeFileSync(allStoresJSON, JSON.stringify(writeToJSON));
}
exports.writeAllUsers = writeAllUsers;
function deleteProductToStore(id, findStore) {
    var allStores = exports.readAllStores();
    var store = allStores.find(function (store) { return store.store === findStore; });
    var index = store.allProducts.findIndex(function (a) { return a.id === id; });
    store.allProducts.splice(index, 1);
    writeAllUsers(allStores);
}
exports.deleteProductToStore = deleteProductToStore;
