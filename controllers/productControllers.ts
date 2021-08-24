import { Product, Products, readAllProducts } from '../models/products'
import { addProductToStore } from '../models/store'


export function addNewProduct(req, res) {
    const product = new Product(req.body.name, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.store)
    const allListProducts = new Products()
    allListProducts.addNewProduct(product)
    addProductToStore(req.body)
    const allProducts = allListProducts.findStore(req.params.store)
    res.send({ok:"Product Added", allProducts:allProducts})
}