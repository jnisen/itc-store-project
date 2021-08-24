"use strict";
exports.__esModule = true;
exports.Products = exports.Product = exports.readAllProducts = void 0;
var fs = require("fs");
var path = require("path");
var allUsersJson = path.resolve(__dirname, "./data/products.json");
var uuidv4 = require("uuid").v4;
exports.readAllProducts = function () {
    try {
        var products = fs.readFileSync(exports.readAllProducts);
        return JSON.parse(products);
    }
    catch (error) {
        console.error(error);
    }
};
var Product = /** @class */ (function () {
    function Product(id, name, description, image, price, quantity, store) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.store = store;
    }
    return Product;
}());
exports.Product = Product;
var Products = /** @class */ (function () {
    function Products() {
        this.allProducts = exports.readAllProducts();
    }
    Products.prototype.addNewUser = function (product) {
        this.allProducts.push(product);
        this.writeProduct();
    };
    Products.prototype.findProductById = function (id) {
        var product = this.allProducts.find(function (product) { return product.id === id; });
        return product;
    };
    Products.prototype.writeProduct = function () {
        fs.writeFileSync(allUsersJson, JSON.stringify(this.allProducts));
    };
    return Products;
}());
exports.Products = Products;
