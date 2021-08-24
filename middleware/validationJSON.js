"use strict";
exports.__esModule = true;
exports.isProductExist = exports.isUserExist = exports.isUser = void 0;
var user_1 = require("../models/user");
var products_1 = require("../models/products");
function isUser(req, res, next) {
    try {
        var _a = req.body, email_1 = _a.email, password_1 = _a.password;
        var allUsers = user_1.readAllUsers();
        var findUser = allUsers.some(function (user) { return (user.email === email_1) && (user.password === password_1); });
        if (!findUser)
            throw new Error("Check your email or password");
        next();
    }
    catch (e) {
        res.status(400).send({ error: "" + e }); //cliente error
    }
}
exports.isUser = isUser;
function isUserExist(req, res, next) {
    try {
        var email_2 = req.body.email;
        var allUsers = user_1.readAllUsers();
        var userExist = allUsers.find(function (user) { return user.email === email_2; });
        if (userExist)
            throw new Error('User already exists');
        next();
    }
    catch (e) {
        res.status(400).send({ error: "" + e }); //cliente error
    }
}
exports.isUserExist = isUserExist;
function isProductExist(req, res, next) {
    try {
        var image_1 = req.body.image;
        var allProducts = products_1.readAllProducts();
        var productExist = allProducts.find(function (product) { return product.image === image_1; });
        if (productExist)
            throw new Error('Product already exists');
        next();
    }
    catch (e) {
        res.status(400).send({ error: "" + e }); //cliente error
    }
}
exports.isProductExist = isProductExist;
