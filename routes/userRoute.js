"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//controllers
var userControllers_1 = require("../controllers/userControllers");
//middleware
var validationSchema_1 = require("../middleware/validationSchema");
var validationJSON_1 = require("../middleware/validationJSON");
var handleCookies_1 = require("../middleware/handleCookies");
//schema
var allSchemas_1 = require("../schemas/allSchemas");
router.post('/addNewUser', validationSchema_1.validateRegister(allSchemas_1.schemaRegister), validationJSON_1.isUserExist, userControllers_1.addNewUser)
    .post('/cookie', validationJSON_1.isUser, userControllers_1.sendCookie)
    .post('/addSection', handleCookies_1.readCookie, userControllers_1.addSection)
    .get('/readCookie', handleCookies_1.readCookie, userControllers_1.getEmail)
    .post('/addCartForNow/:idUser', validationJSON_1.isThereSamProductOnCart, userControllers_1.addCartForNow)
    .put('/editCartNow/:idUser/:idProduct', validationSchema_1.validateEditSchema(allSchemas_1.schemaEditNumber), validationJSON_1.isThereStock, userControllers_1.editCartNow)
    .get('/getAllProducts/:idUser', userControllers_1.getAllCart)["delete"]('/deleteProductOnCart/:id/:idUser', userControllers_1.deleteProductOnCart)
    .post('/buyCart/:idUser', userControllers_1.buyCart);
module.exports = router;
