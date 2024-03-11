import { NextFunction, Request, Response } from "express";
import { pAuthService } from "../services/pAuthServices";

const authService = new pAuthService();

export async function toggleActivation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const toggleResponse = await authService.toggleUserActivation(req.body.id);
    res.status(200).json({ message: toggleResponse.message });
  } catch (error) {
    next(error);
  }
}
