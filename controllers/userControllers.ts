
import {User, Users} from '../models/user'



export function addNewUser(req,res) {
    console.log(req.body)
    const user = new User(req.body.username,req.body.password,req.body.email,'admin')
    //user.cart = []
    const allUsers = new Users();
    allUsers.addNewUser(user)
    res.send({ok:`Hi ${req.body.username}!, now you can log in`})

}