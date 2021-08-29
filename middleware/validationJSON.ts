import { readAllUsers } from '../models/user'
import { readAllProducts } from '../models/products'
import { readAllCarts } from '../models/carts'

export function isUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const allUsers: any = readAllUsers()
        const findUser = allUsers.find(user => user.email === email)
        if (!findUser) throw new Error("You're not in our database, go to register page")
        const checkEmailAndPassword = allUsers.some(user => (user.email === email) && (user.password === password))
        if (!checkEmailAndPassword) throw new Error("Check your email or password")
        next()
    } catch (e) {
        res.status(400).send({ error: `${e.message}` }); //cliente error
    }
}

export function isUserExist(req, res, next) {
    try {
        const { email } = req.body;
        const allUsers: any = readAllUsers()
        const userExist = allUsers.find(user => user.email === email)
        if (userExist) throw new Error('User already exists')
        next()
    } catch (e) {
        res.status(400).send({ error: `${e.message}` }); //cliente error
    }
}

export function isProductExist(req, res, next) {
    try {
        const { image } = req.body;
        const { store, idProduct } = req.params
        const imagePath = `../images/${store}/${image.split('\\')[2]}`
        const allProducts: any = readAllProducts()
        const oldImage = allProducts.find(product => product.id === idProduct).image
        if (imagePath !== oldImage) {
            const productExist = allProducts.find(product => product.image === imagePath)
            if (productExist) throw new Error('Product already exists')
        }
        next()
    } catch (e) {
        res.status(400).send({ error: `${e.message}` }); //cliente error
    }

}

export function isThereProductOnDB(req, res, next) {
    try {
        const allProducts: any = readAllProducts()
        const allProductsStore = allProducts.find(products => products.store === req.params.store)
        if (allProductsStore.length === 0) throw new Error('No database of that store found')
        next()
    } catch (e) {
        res.status(400).send({ error: `${e.message}` }); //cliente error
    }
}

export function isThereSamProductOnCart(req, res, next) {
    try {
        const allUsers: any = readAllUsers()
        const getCart = allUsers.find(user => user.id === req.id).cart;
        const findProduct = getCart.some(product => product.id === req.body.id);
        if (findProduct) throw new Error('Product already picked')
        next()
    } catch (e) {
        res.status(400).send({ error: `${e.message}` }); //cliente error
    }
}

export function isThereStock(req, res, next) {
    try {
        const allProducts: any = readAllProducts()
        const { idProduct } = req.params
        const getProduct = allProducts.find(product => product.id === idProduct)
        if (req.body.number > getProduct.quantity) throw new Error('We dont have enough stock')
        next()
    } catch (e) {
        res.status(400).send({ error: `${e.message}` }); //cliente error
    }
}

