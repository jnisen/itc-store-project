const express = require('express');
const router = express.Router();

import {addNewUser} from '../controllers/userControllers';

import {validateRegister} from '../middleware/validateRegister'

import {schemaRegister} from '../schema/registrationSchema';


router.post('/addNewUser', validateRegister(schemaRegister), addNewUser);


module.exports = router