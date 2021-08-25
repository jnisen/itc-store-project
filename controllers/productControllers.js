"use strict";
exports.__esModule = true;
exports.searchProduct = exports.editProduct = exports.getProduct = exports.deleteProduct = exports.addNewProduct = void 0;
var products_1 = require("../models/products");
var store_1 = require("../models/store");
var allListProducts = new products_1.Products();
function addNewProduct(req, res) {
    var product = new products_1.Product(req.body.name, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.store);
    allListProducts.addNewProduct(product);
    store_1.addProductToStore(product);
    var allProducts = allListProducts.findStore(req.params.store);
    res.send({ ok: "Product Added", allProducts: allProducts });
}
exports.addNewProduct = addNewProduct;
function deleteProduct(req, res) {
    var store = allListProducts.deleteProduct(req.params.id);
    store_1.deleteProductToStore(req.params.id, store);
    res.send({ ok: 'Producto Eliminado' });
}
exports.deleteProduct = deleteProduct;
function getProduct(req, res) {
    var findProduct = allListProducts.findProductById(req.params.id);
    res.send({ Product: findProduct });
}
exports.getProduct = getProduct;
function editProduct(req, res) {
    allListProducts.editProduct(req.params.idProduct, req.params.store, req.body);
    store_1.editProductToStore(req.params.idProduct, req.params.store, req.body);
    res.send({ ok: 'Producto Editado' });
}
exports.editProduct = editProduct;
function searchProduct(req, res) {
    var regrExp = "^" + req.params.searchProduct;
    var searchTermReg = new RegExp(regrExp, 'i');
    var findProduct = allListProducts.searchProduct(searchTermReg);
    res.send({ allProducts: findProduct });
}
exports.searchProduct = searchProduct;
