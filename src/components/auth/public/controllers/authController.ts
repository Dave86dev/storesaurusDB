import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export async function askDeactivation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deactivationResponse = await authService.askForDeactivation(
      req.user.email
    );
    res.status(200).json({
      message: deactivationResponse.message,
      data: deactivationResponse.data,
    });
  } catch (error) {
    next(error);
  }
}

export async function preLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const preRegisterResponse = await authService.preLoginEmail(
      req.body.preEmail
    );
    res.status(200).json({ message: preRegisterResponse.message });
  } catch (error) {
    next(error);
  }
}

export async function preRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const preRegisterResponse = await authService.preRegisterEmail(
      req.body.preEmail
    );
    res.status(200).json({ message: preRegisterResponse.message });
  } catch (error) {
    next(error);
  }
}

export async function userLogin(
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

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(200).json({
      message: `Code provided for ${req.body.email} authentication succesful`,
      data: req.body.email,
    });
  } catch (error) {
    next(error);
  }
}

export async function userRegisterFinal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const insertResponse = await authService.insertUser(req.body);
    res
      .status(201)
      .json({ message: insertResponse.message, data: insertResponse.data });
  } catch (error) {
    next(error);
  }
}
