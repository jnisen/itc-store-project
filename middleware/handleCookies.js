"use strict";
exports.__esModule = true;
exports.readCookie = void 0;
var jwt = require('jwt-simple');
var secret_1 = require("../controllers/secrets/secret");
function readCookie(req, res, next) {
    try {
        var CookieName = req.cookies.CookieName;
        if (!CookieName)
            throw new Error("Nothing is on the cookie");
        var decoded = jwt.decode(CookieName, secret_1.secret);
        req.id = decoded;
        next();
    }
    catch (e) {
        res.status(500).send({ error: "" + e });
    }
}
exports.readCookie = readCookie;
