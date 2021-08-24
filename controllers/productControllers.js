"use strict";
exports.__esModule = true;
exports.addNewProduct = void 0;
var products_1 = require("../models/products");
var store_1 = require("../models/store");
function addNewProduct(req, res) {
    var product = new products_1.Product(req.body.name, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.store);
    var allListProducts = new products_1.Products();
    allListProducts.addNewProduct(product);
    store_1.addProductToStore(req.body);
    var allProducts = allListProducts.findStore(req.params.store);
    res.send({ ok: "Product Added", allProducts: allProducts });
}
exports.addNewProduct = addNewProduct;
