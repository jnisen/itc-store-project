var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log('app Listening on port', port); });
