"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var userControllers_1 = require("../controllers/userControllers");
router.post('/addNewUser', userControllers_1.addNewUser);
module.exports = router;
