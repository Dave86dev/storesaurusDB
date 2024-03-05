import { NextFunction, Request, Response } from "express";
import { pAuthService } from "../services/pAuthServices";

const authService = new pAuthService();

export async function deactivateU(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deactivateResponse = await authService.deactivateUser(req.body.id);
    res.status(200).json({ message: deactivateResponse.message });
  } catch (error) {
    next(error);
  }
}
