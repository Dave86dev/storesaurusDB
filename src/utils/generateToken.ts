
import jwt from 'jsonwebtoken'
import appConfig from '../../config';
import { userDB } from "../components/auth/models/user"

export const generateToken = (user: userDB): string => {

    if(!user._id) throw new Error("User ID is required for token generation");

    const payload = {
        _id: user._id,
        email: user.email
    }

    const token = jwt.sign(payload, appConfig.secretKey, {
        algorithm: 'HS256',
        expiresIn: '7d'
    })

    return token
}