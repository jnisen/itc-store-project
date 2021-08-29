const express = require('express');
const router = express.Router();

//controllers
import { addNewProduct, deleteProduct, getProduct, editProduct, searchProduct } from '../controllers/productControllers';

//middleware
import { validateProduct, imageExist } from '../middleware/validationSchema'
import { isProductExistAdd, isProductExistEdit, isThereProductOnDB } from '../middleware/validationJSON'

//schema
import { schemaProduct } from '../schemas/allSchemas';

router.post('/addNewProduct/:store', validateProduct(schemaProduct), imageExist, isProductExistAdd, addNewProduct)
       .delete('/deleteProduct/:id', deleteProduct)
       .get('/getProduct/:id', getProduct)
       .put('/editProduct/:idProduct/:store', validateProduct(schemaProduct), imageExist, isProductExistEdit, editProduct)
       .get('/searchProduct/:store/:searchProduct', isThereProductOnDB, searchProduct)

module.exports = router
