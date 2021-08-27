const Ajv = require("ajv")
const ajv = new Ajv.default({ allErrors: true });
const addFormats = require('ajv-formats');
const ajvErrors = require('ajv-errors');
addFormats(ajv);
ajvErrors(ajv);

export function validateRegister(schema) {

    return (req, res, next) => {

        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            let propError = ajv.errors[0].instancePath.replace('/', '')
            propError = propError.charAt(0).toUpperCase() + propError.slice(1)
            res.status(404).send({ error: `${propError}: ${ajv.errors[0]['message']}` })
        }
        else
            next()

    }
}


export function validateProduct(schema) {

    return (req, res, next) => {

        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            let propError = ajv.errors[0].instancePath.replace('/', '')
            propError = propError.charAt(0).toUpperCase() + propError.slice(1)
            res.status(404).send({ error: `${propError}: ${ajv.errors[0]['message']}` })
        }
        else
            next()

    }
}


export function imageExist(req, res, next) {
    const {image} = req.body
    console.log((image.split('/')[3]))
    if (image.split('/')[3] === 'undefined') res.status(404).send({ error: `Check you file input`})
    else next()
}

//req.hash = hash

export function validateEditSchema(schema) {

    return (req, res, next) => {

        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            let propError = ajv.errors[0].instancePath.replace('/', '')
            propError = propError.charAt(0).toUpperCase() + propError.slice(1)
            res.status(404).send({ error: `${propError}: ${ajv.errors[0]['message']}` })
        }
        else
            next()

    }
}