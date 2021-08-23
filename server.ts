const express = require('express');
var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/html')))

app.use(express.json());
app.use(morgan('tiny'))
app.use(cookieParser())

const userRoute = require('./routes/userRoute')
app.use('/user',userRoute)


app.listen(port, ()=> console.log('app Listening on port', port))