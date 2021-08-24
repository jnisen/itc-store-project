"use strict";
exports.__esModule = true;
exports.getStore = void 0;
var store_1 = require("../models/store");
function getStore(req, res) {
    var allStores = store_1.readAllStores();
    var findStore = allStores.find(function (store) { return store.store === req.params.store; });
    res.send({ findStore: findStore });
}
exports.getStore = getStore;
