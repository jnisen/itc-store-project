const express = require('express');
var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/html')))

app.use(cookieParser())
app.use(express.json());
app.use(morgan('tiny'))



const userRoute = require('./routes/userRoute')
app.use('/user',userRoute)


const productRoute = require('./routes/productRoute')
app.use('/product',productRoute)


const storeRoute = require('./routes/storeRoute')
app.use('/store',storeRoute)

const cartRoute = require('./routes/cartRoute')
app.use('/cart',cartRoute)



app.listen(port, ()=> console.log('app Listening on port', port))