const express = require('express');
const router = express.Router();

//controllers
import {addNewUser, sendCookie, addSection,getEmail, addCartForNow,editCartNow,getAllCart,deleteProductOnCart,buyCart,seeCartStore} from '../controllers/userControllers';

//middleware
import {validateRegister,validateEditSchema} from '../middleware/validationSchema'
import {isUser,isUserExist,isThereSamProductOnCart,isThereStock,} from '../middleware/validationJSON'
import {readCookie} from '../middleware/handleCookies'

//schema
import {schemaRegister,schemaEditNumber} from '../schemas/allSchemas';


router.post('/addNewUser', validateRegister(schemaRegister),isUserExist,addNewUser)
       .post('/cookie', isUser, sendCookie)
       .post('/addSection', readCookie, addSection)
       .get('/readCookie', readCookie,getEmail)
       .post('/addCartForNow/',readCookie,isThereSamProductOnCart,addCartForNow)
       .put('/editCartNow/:idProduct', validateEditSchema(schemaEditNumber),isThereStock,readCookie,editCartNow)
       .delete('/deleteProductOnCart/:id/:store', readCookie,deleteProductOnCart)
       .post('/buyCart/:store', readCookie,buyCart)
       .get('/seeCartStore/:store', readCookie,seeCartStore)


module.exports = router