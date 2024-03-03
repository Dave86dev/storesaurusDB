import * as errors from "restify-errors";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export async function postRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await authService.insertUser(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

export async function postLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loginResponse = await authService.loginUser(req.body);
    res.status(200).json({
      message: loginResponse.message,
      token: loginResponse.token,
    });
  } catch (error) {
    next(error);
  }
}
