
import { userDB } from "../components/auth/models/user"
import jwt from 'jsonwebtoken'

export const generateToken = (user: userDB): string => {

    if(!user._id) throw new Error("User ID is required for token generation");

    const payload = {
        _id: user._id,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '7d'
    })

    return token
}