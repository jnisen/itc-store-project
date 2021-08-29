const express = require('express');
const router = express.Router();

//controllers
import { getStore } from '../controllers/storeControllers';


router.get('/getStore/:store', getStore)

module.exports = router
