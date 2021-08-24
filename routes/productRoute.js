"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//controllers
var productControllers_1 = require("../controllers/productControllers");
//middleware
// import {validateProduct} from '../middleware/validateRegister'
//schema
// import {schemaProduct} from '../schemas/allSchemas';
router.post('/addNewProduct/:store', productControllers_1.addNewProduct)["delete"]('/deleteProduct/:id', productControllers_1.deleteProduct);
module.exports = router;
