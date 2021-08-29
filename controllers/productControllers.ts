import { Product, Products, readAllProducts } from '../models/products'
import { addProductToStore, deleteProductToStore, editProductToStore } from '../models/store'

let allListProducts = new Products()

export function addNewProduct(req, res) {
    const product = new Product(req.body.name, req.body.description, req.body.image, req.body.price, req.body.quantity, req.body.store)
    allListProducts.addNewProduct(product)
    addProductToStore(product)
    const allProducts = allListProducts.findStore(req.params.store)
    res.send({ ok: "Product Added", allProducts: allProducts })
}

export function deleteProduct(req, res) {
    const store = allListProducts.deleteProduct(req.params.id)
    deleteProductToStore(req.params.id, store)
    res.send({ ok: 'Producto Eliminado' })
}

export function getProduct(req, res) {
    const findProduct = allListProducts.findProductById(req.params.id)
    res.send({ Product: findProduct })
}

export function editProduct(req, res) {

    allListProducts.editProduct(req.params.idProduct, req.params.store, req.body)
    editProductToStore(req.params.idProduct, req.params.store, req.body)
    res.send({ ok: 'Producto Editado' })

}

export function searchProduct(req, res) {
    const regrExp: string = `^${req.params.searchProduct}`
    const searchTermReg: RegExp = new RegExp(regrExp, 'i');
    const findProduct = allListProducts.searchProduct(searchTermReg, req.params.store)
    res.send({ allProducts: findProduct })
}
