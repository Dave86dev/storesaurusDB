import { Request, Response, NextFunction } from 'express';

export const handleError = (err: any, req: Request, res: Response, _next: NextFunction) => {

  if (err.statusCode && err.message) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: 'An unexpected error occurred' });
  }
};
