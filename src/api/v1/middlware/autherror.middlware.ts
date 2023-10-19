import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid token...' });
  } else {
    next(err);
  }
};
