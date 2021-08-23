const Ajv = require("ajv")
const ajv = new Ajv()

export function validateRegister(schema) {

    return (req, res, next) => {

        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            const propError = ajv.errors[0].instancePath.replace('/', '')
            res.status(404).send({ error: `${propError}: ${ajv.errors[0].message}` })
        }
        else
            next()

    }
}