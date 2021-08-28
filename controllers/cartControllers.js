"use strict";
exports.__esModule = true;
exports.historialCart = void 0;
var carts_1 = require("../models/carts");
function historialCart(req, res) {
    var getAllCartsHistorial = carts_1.seeAllCartsStore(req.params.store);
    res.send({ allCarts: getAllCartsHistorial });
}
exports.historialCart = historialCart;
