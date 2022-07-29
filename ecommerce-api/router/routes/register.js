import { insertUser, userExist } from "../../service/db.js"
import jwt from 'jsonwebtoken'

export default async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (await userExist(email)) {
    res.send({error: 'ERR001'})
  } else {
    const token = await jwt.sign({email:email}, 'shhhhh')
    await insertUser(email, password)
    res.send({token})
  }
}