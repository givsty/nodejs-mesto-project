import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/auth';
import { ERROR_MESSAGES } from '../constants/error';

interface SessionRequest extends Request {
  user?: JwtPayload | string;
}

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  const { JWT_SECRET = 'secret_key' } = process.env;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGES.unauthorized.notAuth));
    return;
  }

  req.user = payload;
  next();
};
