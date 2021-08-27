
import { User, Users, readAllUsers } from '../models/user'
import {Products} from '../models/products'
import { addCart, Cart } from '../models/carts'
import { removeStock } from '../models/store'

import { secret } from './secrets/secret';

const { v4: uuidv4 } = require("uuid");

const jwt = require('jwt-simple');

const adminsArray = ['jnisen@gmail.com', 'leo@gmail.com', 'salmon@gmail.com']

export function addNewUser(req, res) {
    const user = new User(req.body.username, req.body.email, req.body.password)
    console.log(adminsArray)
    const role =  adminsArray.includes(req.body.email) ? user.role = 'admin' : user.role = 'public'
    if (role === 'public') user.cart = []
    const allUsers = new Users();
    allUsers.addNewUser(user)
    res.send({ ok: `Hi ${req.body.username} 😃` })

}

export function sendCookie(req, res) {
    try {
        const allUsers: any = readAllUsers()
        const findUser = allUsers.find(user => (user.email === req.body.email))
        const idUser = findUser.id
        const tokenUser = jwt.encode(idUser, secret)
        res.cookie('CookieName', tokenUser, { maxAge: 30000000, httpOnly: true })
        res.send({ ok: `Welcome ${findUser.username}`, user: findUser })
    } catch (e) {
        res.status(500).send({ error: `${e.message}` });
    }
}

export function addSection(req, res) {
    const allUsers = new Users();
    const user = allUsers.findUserById(req.id)
    user.store = req.body.store
    allUsers.writeAllUsers()
    res.send({ ok: `Welcome to the store ${req.body.store}` })
}

export function getEmail(req, res){
    const allUsers = new Users();
    const user = allUsers.findUserById(req.id)
    res.send({user:user})
}

export function addCartForNow(req, res){
    const allUsers = new Users();
    allUsers.addCart(req.params.idUser, req.body)
    res.send({ok:true})
}

export function editCartNow(req, res){
    const allUsers = new Users();
    const cartUser = allUsers.editCar(req.params.idUser, req.body, req.params.idProduct)
    res.send(cartUser)
}

export function getAllCart(req, res){
    const allUsers = new Users();
    const user = allUsers.findUserById(req.params.idUser);
    res.send({cart:user.cart})
}

export function deleteProductOnCart(req, res){
    const allUsers = new Users();
    const {id, idUser} = req.params;
    const user = allUsers.deleteProductOnCart(id, idUser)
    res.send({ok:"Delete Product",cart:user.cart})
}

export function buyCart(req, res){
    const allUsers = new Users();
    const {idUser} = req.params;
    const user = allUsers.findUserById(idUser)

    const date = new Date();
    const dateString = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear()

    const newCart = {
        id:uuidv4(),
        date:dateString,
        cart:user.cart
    }

    const allProducts = new Products()

    allProducts.editProductCart(user.cart)
    addCart(newCart)    

    removeStock(user.cart, user.store)

    allUsers.buyCart(idUser)

   res.send({"ok":"Felicidades por su compra"})
}