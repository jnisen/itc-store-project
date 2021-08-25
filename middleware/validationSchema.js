"use strict";
exports.__esModule = true;
exports.imageExist = exports.validateProduct = exports.validateRegister = void 0;
var Ajv = require("ajv");
var ajv = new Ajv["default"]({ allErrors: true });
var addFormats = require('ajv-formats');
var ajvErrors = require('ajv-errors');
addFormats(ajv);
ajvErrors(ajv);
function validateRegister(schema) {
    return function (req, res, next) {
        var valid = ajv.validate(schema, req.body);
        if (!valid) {
            var propError = ajv.errors[0].instancePath.replace('/', '');
            propError = propError.charAt(0).toUpperCase() + propError.slice(1);
            res.status(404).send({ error: propError + ": " + ajv.errors[0]['message'] });
        }
        else
            next();
    };
}
exports.validateRegister = validateRegister;
function validateProduct(schema) {
    return function (req, res, next) {
        var valid = ajv.validate(schema, req.body);
        if (!valid) {
            var propError = ajv.errors[0].instancePath.replace('/', '');
            propError = propError.charAt(0).toUpperCase() + propError.slice(1);
            res.status(404).send({ error: propError + ": " + ajv.errors[0]['message'] });
        }
        else
            next();
    };
}
exports.validateProduct = validateProduct;
function imageExist(req, res, next) {
    var image = req.body.image;
    console.log((image.split('/')[3]));
    if (image.split('/')[3] === 'undefined')
        res.status(404).send({ error: "Check you file input" });
    else
        next();
}
exports.imageExist = imageExist;
//req.hash = hash
