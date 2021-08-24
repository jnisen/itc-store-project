"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//controllers
var storeControllers_1 = require("../controllers/storeControllers");
router.get('/getStore/:store', storeControllers_1.getStore);
module.exports = router;
