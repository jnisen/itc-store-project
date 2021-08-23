"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var userControllers_1 = require("../controllers/userControllers");
var validateRegister_1 = require("../middleware/validateRegister");
var registrationSchema_1 = require("../schema/registrationSchema");
router.post('/addNewUser', validateRegister_1.validateRegister(registrationSchema_1.schemaRegister), userControllers_1.addNewUser);
module.exports = router;
