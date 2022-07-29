import { getUser } from "../../service/db.js"
import { comparePassword } from "../../service/encrypt.js"
import jwt from 'jsonwebtoken'

export default async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await getUser(email)
    res.setHeader('Content-Type', 'application/json')
    if (user && await comparePassword(password, user.password)) {
        const token = await jwt.sign({email}, 'shhhhh')
        res.send({token})
    } else {
        res.send({error: 'ERR001'})
    }
}
