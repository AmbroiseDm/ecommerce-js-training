import jwt from 'jsonwebtoken'

export default async (req, res) => {
    const token = req.body.token

    try {
        const response = await jwt.verify(token, 'shhhhh')
        res.send({email: response.email})
    } catch (error) {
        console.log(error);
        res.send({error:'non-valid token'})
    }
}