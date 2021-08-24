"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.addNewProduct = void 0;
var products_1 = require("../models/products");
var store_1 = require("../models/store");
function addNewProduct(req, res) {
    var product = new products_1.Product(req.body.name, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.store);
    var allListProducts = new products_1.Products();
    allListProducts.addNewProduct(product);
    store_1.addProductToStore(product);
    var allProducts = allListProducts.findStore(req.params.store);
    res.send({ ok: "Product Added", allProducts: allProducts });
}
exports.addNewProduct = addNewProduct;
function deleteProduct(req, res) {
    var allListProducts = new products_1.Products();
    var store = allListProducts.deleteProduct(req.params.id);
    store_1.deleteProductToStore(req.params.id, store);
    res.send();
}
exports.deleteProduct = deleteProduct;
