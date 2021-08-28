"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//controllers
var cartControllers_1 = require("../controllers/cartControllers");
router.get('/historialCart/:store', cartControllers_1.historialCart);
module.exports = router;
