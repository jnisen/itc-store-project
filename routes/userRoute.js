"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//controllers
var userControllers_1 = require("../controllers/userControllers");
//middleware
var validateRegister_1 = require("../middleware/validateRegister");
var userMiddleWare_1 = require("../middleware/userMiddleWare");
//schema
var allSchemas_1 = require("../schemas/allSchemas");
router.post('/addNewUser', validateRegister_1.validateRegister(allSchemas_1.schemaRegister), userMiddleWare_1.isUserExist, userControllers_1.addNewUser)
    .post('/cookie', userMiddleWare_1.isUser, userControllers_1.sendCookie);
module.exports = router;
