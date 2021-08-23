const Ajv = require("ajv")
const ajv = new Ajv()

export const schemaRegister = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
        username: { type: 'string', minLength: 1, maxLength: 12 },
        email: { type: 'string'},
        password: {type: 'string',minLength: 1},
    },
    additionalProperties: false,

}



//format email
//format password, minimo required
//flunet json schema