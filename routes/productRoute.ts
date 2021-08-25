const express = require('express');
const router = express.Router();

//controllers
import {addNewProduct,deleteProduct,getProduct, editProduct} from '../controllers/productControllers';

//middleware
import {validateProduct,imageExist} from '../middleware/validationSchema'
import {isProductExist} from '../middleware/validationJSON'

//schema
import {schemaProduct} from '../schemas/allSchemas';

router.post('/addNewProduct/:store', validateProduct(schemaProduct),imageExist,isProductExist,addNewProduct)
       .delete('/deleteProduct/:id', deleteProduct)
       .get('/getProduct/:id',getProduct)
       .put('/editProduct/:idProduct/:store',editProduct) //how to apply schema

module.exports = router
