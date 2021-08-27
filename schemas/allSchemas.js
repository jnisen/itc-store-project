"use strict";
exports.__esModule = true;
exports.schemaEditNumber = exports.schemaProduct = exports.schemaRegister = void 0;
exports.schemaRegister = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
        username: { type: 'string', minLength: 1, maxLength: 12, errorMessage: "Debe contener caracteresn o esta vacio el username o supera el maximo de 12 digitos" },
        email: { type: 'string', format: 'email', errorMessage: "El formato no es el correcto" },
        password: { type: 'string', minLength: 1, errorMessage: "como minimo el pass debe tener 1 caracter" }
    },
    additionalProperties: true
};
exports.schemaProduct = {
    type: "object",
    required: ["name", "description", "image", "quantity", "price"],
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 12, errorMessage: "Debe contener caracteresn o esta vacio el username o supera el maximo de 12 digitos" },
        description: { type: 'string', minLength: 1, errorMessage: "El formato no es el correcto" },
        image: { type: 'string', minLength: 1, errorMessage: "El formato no es el correcto" },
        quantity: { type: 'number', errorMessage: "Incorrecto formato o vacio" },
        price: { type: 'number', errorMessage: "Incorrecto formato o vacio" }
    },
    additionalProperties: true
};
exports.schemaEditNumber = {
    type: "object",
    required: ["number"],
    properties: {
        number: { type: 'number', errorMessage: "Incorrecto formato" }
    },
    additionalProperties: true
};
