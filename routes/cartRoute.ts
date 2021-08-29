const express = require('express');
const router = express.Router();

//controllers
import { historialCart } from '../controllers/cartControllers';


router.get('/historialCart/:store', historialCart)

module.exports = router
