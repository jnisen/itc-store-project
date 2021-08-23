"use strict";
exports.__esModule = true;
exports.schemaRegister = void 0;
var Ajv = require("ajv");
var ajv = new Ajv();
exports.schemaRegister = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
        username: { type: 'string', minLength: 1, maxLength: 12 },
        email: { type: 'string' },
        password: { type: 'string', minLength: 1 }
    },
    additionalProperties: false
};
//format email
//format password, minimo required
//flunet json schema
