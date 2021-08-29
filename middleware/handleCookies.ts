
const jwt = require('jwt-simple');

import { secret } from "../controllers/secrets/secret"
import { readAllUsers } from '../models/user'

export function readCookie(req, res, next) {
    try {
        const { CookieName } = req.cookies
        if (!CookieName) throw new Error("Nothing is on the cookie")
        const decoded = jwt.decode(CookieName, secret)
        req.id = decoded
        next()
    } catch (e) {
        res.status(500).send({ error: `${e}` });
    }
}