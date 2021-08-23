import { readAllUsers } from '../models/user'

export function isUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const allUsers: any = readAllUsers()
        const findUser = allUsers.some(user => (user.email === email) && (user.password === password))
        if (!findUser) throw new Error("Check your email or password")
        next()
    } catch (e) {
        res.status(400).send({ error: `${e}` }); //cliente error
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
        res.status(400).send({ error: `${e}` }); //cliente error
    }


}