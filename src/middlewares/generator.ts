import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

export const generator =
  (cb: (...args: any[]) => Promise<any>, params: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cbParams = params.map((e) => get(req, e));
      res.send(await cb(...cbParams));
    } catch (e) {
      next(e);
    }
  };
