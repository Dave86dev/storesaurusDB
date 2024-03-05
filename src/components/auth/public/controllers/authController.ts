import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export async function postLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loginResponse = await authService.loginUser(req.body);
    res.status(200).json({
      message: loginResponse.message,
      data: loginResponse.data,
    });
  } catch (error) {
    next(error);
  }
}

export async function postRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const insertResponse = await authService.insertUser(req.body);
    res.status(201).json({ message: insertResponse.message });
  } catch (error) {
    next(error);
  }
}
