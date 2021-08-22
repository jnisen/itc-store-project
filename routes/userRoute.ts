const express = require('express');
const router = express.Router();

import {addNewUser} from '../controllers/userControllers';

router.post('/addNewUser', addNewUser);


module.exports = router