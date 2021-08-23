
import { User, Users, readAllUsers } from '../models/user'
import { secret } from './secrets/secret';

const jwt = require('jwt-simple');

export function addNewUser(req, res) {
    console.log(req.body)
    const user = new User(req.body.username, req.body.email, req.body.password, 'admin')
    //user.cart = []
    const allUsers = new Users();
    allUsers.addNewUser(user)
    res.send({ ok: `Hi ${req.body.username}!, now you can log in` })

}

export function sendCookie(req, res) {
    try {
        const allUsers: any = readAllUsers() //is necessary?
        const findUser = allUsers.find(user => (user.email === req.body.email))
        const idUser = findUser.id
        const tokenUser = jwt.encode(idUser, secret)
        res.cookie('CookieName', tokenUser, { maxAge: 30000000, httpOnly: true })
        res.send({ ok: `Welcome ${findUser.username}` })
    } catch (e) {
        res.status(500).send({ error: `${e.message}` });
    }
}

//repasswrod
//app.morgan('tiny')


// export function getCookie(req, res) {
//     try {

//         const { cookieName } = req.cookies
//         if (!cookieName) throw new Error("Nothing is on the cookie")
//         const decoded = jwt.decode(cookieName, secret);
//         res.send(decoded);

//     } catch (e) {
//         res.status(500).send({ error: `${e.message}` });
//     }
// };