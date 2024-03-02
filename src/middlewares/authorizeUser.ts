import * as errors from "restify-errors";
import { Request, Response, NextFunction } from "express";

export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {

    const userIdFromToken = req.user.id;
    const userIdFromRequest = req.body.userId;

    if(userIdFromToken !== userIdFromRequest){
        return next(new errors.UnauthorizedError("Unauthorized access attempt detected"))
    }

    next();
}