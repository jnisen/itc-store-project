"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//controllers
var productControllers_1 = require("../controllers/productControllers");
//middleware
var validationSchema_1 = require("../middleware/validationSchema");
var validationJSON_1 = require("../middleware/validationJSON");
//schema
var allSchemas_1 = require("../schemas/allSchemas");
router.post('/addNewProduct/:store', validationSchema_1.validateProduct(allSchemas_1.schemaProduct), validationSchema_1.imageExist, validationJSON_1.isProductExist, productControllers_1.addNewProduct)["delete"]('/deleteProduct/:id', productControllers_1.deleteProduct)
    .get('/getProduct/:id', validationJSON_1.readProduct, productControllers_1.getProduct)
    .put('/editProduct/:idProduct/:store', validationSchema_1.validateProduct(allSchemas_1.schemaProduct), validationSchema_1.imageExist, validationJSON_1.isProductExist, productControllers_1.editProduct)
    .get('/searchProduct/:store/:searchProduct', validationJSON_1.isThereProductOnDB, productControllers_1.searchProduct);
module.exports = router;
