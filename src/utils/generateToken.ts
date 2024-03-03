import jwt from "jsonwebtoken";
import appConfig from "../../config";
import { userDB } from "../components/auth/models/user";

export const generateToken = (user: userDB): string => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, appConfig.secretKey, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return token;
};
