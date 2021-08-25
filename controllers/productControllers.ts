import { Product, Products, readAllProducts } from '../models/products'
import { addProductToStore,deleteProductToStore, editProductToStore } from '../models/store'


export function addNewProduct(req, res) {
    const product = new Product(req.body.name, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.store)
    const allListProducts = new Products()
    allListProducts.addNewProduct(product)
    addProductToStore(product)
    const allProducts = allListProducts.findStore(req.params.store)
    res.send({ok:"Product Added", allProducts:allProducts})
}

export function deleteProduct(req, res){
    const allListProducts = new Products()
    const store = allListProducts.deleteProduct(req.params.id)
    deleteProductToStore(req.params.id, store)
    res.send({ok:'Producto Eliminado'})
}

export function getProductToEdit(req, res){
    const allListProducts = new Products()
    const findProduct = allListProducts.findProductById(req.params.id)
    res.send({Product:findProduct})
}

export function editProduct(req ,res){
    const allListProducts = new Products()
    allListProducts.editProduct(req.params.idProduct, req.body)
    editProductToStore(req.params.idProduct, req.params.store, req.body )
    res.send({ok:'Producto Editado'})

}