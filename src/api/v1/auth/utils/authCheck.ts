import { expressjwt, Request } from 'express-jwt';
import jwt from 'jsonwebtoken';

const getTokenFromHeader = (req: Request) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return undefined;
};

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw Error('No secret established');
}

export const authMiddleware = {
  required: expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    getToken: getTokenFromHeader,
  }),
};

export const signUserToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
  return token;
};

export const unlessPaths = [
  '/api/v1/auth/login',
  '/api/v1/auth/signup',
  '/api/v1/auth/reset-password',
];
