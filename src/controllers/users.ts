import { Response, Request } from 'express';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send(err));
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(400).send(err));
};

export const findUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => res.json({ data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res;
      }
      return res;
    });
};

export const updateAvatar = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res;
      }

      return res;
    });
};
export const updateUser = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => res.send({ data: updatedUser?.avatar }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res;
      }

      return res;
    });
};
