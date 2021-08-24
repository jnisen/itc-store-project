const express = require('express');
const router = express.Router();

//controllers
import {addNewProduct,deleteProduct} from '../controllers/productControllers';

//middleware
import {validateProduct} from '../middleware/validationSchema'
import {isProductExist} from '../middleware/validationJSON'

//schema
import {schemaProduct} from '../schemas/allSchemas';

router.post('/addNewProduct/:store', validateProduct(schemaProduct),isProductExist,addNewProduct)
       .delete('/deleteProduct/:id', deleteProduct)

module.exports = router
