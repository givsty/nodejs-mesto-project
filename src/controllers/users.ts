import { Response, Request } from 'express';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
// eslint-disable-next-line import/no-unresolved
import { CODE_STATUS, ERROR_MESSAGES } from 'contstants/error';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.uncorrectData });
      }

      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(CODE_STATUS.internalServerError)
      .send({ message: ERROR_MESSAGES.somethingWrong }));
};

export const findUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(CODE_STATUS.notFound).send({ message: ERROR_MESSAGES.userNotFoud });
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }
      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const updateAvatar = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(CODE_STATUS.notFound).send({ message: ERROR_MESSAGES.userNotFoud });
      }

      return res.send({ data: updatedUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.uncorrectData });
      }

      if (error.name === 'CastError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }

      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const updateUser = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(CODE_STATUS.notFound).send({ message: ERROR_MESSAGES.userNotFoud });
      }

      return res.send({ data: updatedUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.uncorrectData });
      }

      if (error.name === 'CastError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }

      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};
