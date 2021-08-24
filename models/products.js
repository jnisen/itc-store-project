"use strict";
exports.__esModule = true;
exports.Products = exports.Product = exports.readAllProducts = void 0;
var fs = require("fs");
var path = require("path");
var allProductsJSON = path.resolve(__dirname, "./data/products.json");
var uuidv4 = require("uuid").v4;
exports.readAllProducts = function () {
    try {
        var products = fs.readFileSync(allProductsJSON);
        return JSON.parse(products);
    }
    catch (error) {
        console.error(error);
    }
};
var Product = /** @class */ (function () {
    function Product(name, description, image, price, quantity, store) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.store = store;
        this.id = uuidv4();
    }
    return Product;
}());
exports.Product = Product;
var Products = /** @class */ (function () {
    function Products() {
        this.allProducts = exports.readAllProducts();
    }
    Products.prototype.addNewProduct = function (product) {
        this.allProducts.push(product);
        this.writeProduct();
    };
    Products.prototype.deleteProduct = function (id) {
        var store = this.allProducts.find(function (product) { return product.id === id; }).store;
        this.allProducts = this.allProducts.filter(function (product) { return product.id !== id; });
        this.writeProduct();
        return store;
    };
    Products.prototype.findProductById = function (id) {
        var product = this.allProducts.find(function (product) { return product.id === id; });
        return product;
    };
    Products.prototype.findStore = function (store) {
        var findStore = this.allProducts.filter(function (product) { return product.store === store; });
        return findStore;
    };
    Products.prototype.writeProduct = function () {
        fs.writeFileSync(allProductsJSON, JSON.stringify(this.allProducts));
    };
    return Products;
}());
exports.Products = Products;
