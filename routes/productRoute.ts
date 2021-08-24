const express = require('express');
const router = express.Router();

//controllers
import {addNewProduct} from '../controllers/productControllers';

//middleware
// import {validateProduct} from '../middleware/validateRegister'

//schema
// import {schemaProduct} from '../schemas/allSchemas';

router.post('/addNewProduct/:store',addNewProduct)

module.exports = router
