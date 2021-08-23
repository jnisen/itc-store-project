"use strict";
exports.__esModule = true;
exports.validateRegister = void 0;
var Ajv = require("ajv");
var ajv = new Ajv();
function validateRegister(schema) {
    return function (req, res, next) {
        var valid = ajv.validate(schema, req.body);
        if (!valid) {
            var propError = ajv.errors[0].instancePath.replace('/', '');
            res.status(404).send({ error: propError + ": " + ajv.errors[0].message });
        }
        else
            next();
    };
}
exports.validateRegister = validateRegister;
