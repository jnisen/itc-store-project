"use strict";
exports.__esModule = true;
exports.userCookieWrite = exports.userCookieRead = void 0;
function userCookieRead(req, res, next) {
    try {
        var userDetails = req.cookies.userDetails;
        if (userDetails) {
            var cookie = JSON.parse(userDetails);
            var username = cookie.username, email = cookie.email;
            req.cookieExist = true;
            req.username = username;
            req.email = email;
            next();
        }
        else {
            req.cookieExist = false;
            res.status(404).send({ cookieExist: req.cookieExist, message: 'The session has expired. Please login again.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.userCookieRead = userCookieRead;
function userCookieWrite(req, res, next) {
    try {
        //Get the information from the body
        var _a = req.body, username = _a.username, email = _a.email;
        if ((!username) || (!email))
            throw new Error("User details processing issues");
        //Here I set the cookie
        var cookieToWrite = JSON.stringify({ username: username, email: email });
        res.cookie("userDetails", cookieToWrite, { maxAge: 900000, httpOnly: true });
        req.username = username;
        req.email = email;
        //"Next" means that I will continue with the Route
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.userCookieWrite = userCookieWrite;
