
import {User, Users} from '../models/user'

export function addNewUser(req,res) {

    const user = new User(req.body.email,'admin',req.body.password,req.body.username)
    const allUsers = new Users();
    allUsers.addNewUser(user)
    res.send({ok:"User Created"})

}