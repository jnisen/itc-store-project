const express = require('express');
const router = express.Router();

//controllers
import {addNewProduct,deleteProduct} from '../controllers/productControllers';

//middleware
// import {validateProduct} from '../middleware/validateRegister'

//schema
// import {schemaProduct} from '../schemas/allSchemas';

router.post('/addNewProduct/:store',addNewProduct)
       .delete('/deleteProduct/:id', deleteProduct)

module.exports = router
