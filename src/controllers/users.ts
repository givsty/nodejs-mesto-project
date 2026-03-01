import { Response, Request, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
// eslint-disable-next-line import/no-unresolved
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../constants/error';
import User from '../models/user';

import BadRequestError from '../errors/bad-request';
import NotFoundError from '../errors/not-found';
import ConflictError from '../errors/conflict';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.conflict));
      }
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(ERROR_MESSAGES.uncorrectData));
      }
      return next(error);
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const findUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) return next(new NotFoundError(ERROR_MESSAGES.userNotFoud));
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      return next(error);
    });
};

export const updateAvatar = (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) return next(new NotFoundError(ERROR_MESSAGES.userNotFoud));
      return res.send({ data: updatedUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') return next(new BadRequestError(ERROR_MESSAGES.uncorrectData));
      if (error.name === 'CastError') return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      return next(error);
    });
};

export const updateUser = (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) return next(new NotFoundError(ERROR_MESSAGES.userNotFoud));
      return res.send({ data: updatedUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') return next(new BadRequestError(ERROR_MESSAGES.uncorrectData));
      if (error.name === 'CastError') return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      return next(error);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const { JWT_SECRET = 'secret_key' } = process.env;
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Пользователь успешно авторизован' });
    })
    .catch(next);
};

export const getCurrentUser = (req: UserRequest, res: Response, next: NextFunction) => {
  const _id = req.user?._id;

  User.findById(_id)
    .then((user) => {
      if (!user) return next(new NotFoundError(ERROR_MESSAGES.userNotFoud));
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      return next(error);
    });
};
