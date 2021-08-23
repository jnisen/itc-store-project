const express = require('express');
const router = express.Router();

//controllers
import {addNewUser, sendCookie} from '../controllers/userControllers';

//middleware
import {validateRegister} from '../middleware/validateRegister'
import {isUser,isUserExist} from '../middleware/userMiddleWare'

//schema
import {schemaRegister} from '../schemas/allSchemas';


router.post('/addNewUser', validateRegister(schemaRegister),isUserExist,addNewUser)
       .post('/cookie', isUser, sendCookie)


module.exports = router