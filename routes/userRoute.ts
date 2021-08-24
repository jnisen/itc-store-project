const express = require('express');
const router = express.Router();

//controllers
import {addNewUser, sendCookie, addSection} from '../controllers/userControllers';

//middleware
import {validateRegister} from '../middleware/validationSchema'
import {isUser,isUserExist} from '../middleware/validationJSON'
import {readCookie} from '../middleware/handleCookies'

//schema
import {schemaRegister} from '../schemas/allSchemas';


router.post('/addNewUser', validateRegister(schemaRegister),isUserExist,addNewUser)
       .post('/cookie', isUser, sendCookie)
       .post('/addSection', readCookie, addSection)


module.exports = router