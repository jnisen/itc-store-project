const express = require('express');
const router = express.Router();

//controllers
import {addNewUser, sendCookie, addSection,getEmail, addCartForNow,editCartNow,getAllCart,deleteProductOnCart,buyCart} from '../controllers/userControllers';

//middleware
import {validateRegister} from '../middleware/validationSchema'
import {isUser,isUserExist,isThereSamProductOnCart} from '../middleware/validationJSON'
import {readCookie} from '../middleware/handleCookies'

//schema
import {schemaRegister} from '../schemas/allSchemas';


router.post('/addNewUser', validateRegister(schemaRegister),isUserExist,addNewUser)
       .post('/cookie', isUser, sendCookie)
       .post('/addSection', readCookie, addSection)
       .get('/readCookie', readCookie,getEmail)
       .post('/addCartForNow/:idUser',isThereSamProductOnCart,addCartForNow)
       .put('/editCartNow/:idUser/:idProduct', editCartNow)
       .get('/getAllProducts/:idUser', getAllCart)
       .delete('/deleteProductOnCart/:id/:idUser', deleteProductOnCart)
       .post('/buyCart/:idUser', buyCart)


module.exports = router