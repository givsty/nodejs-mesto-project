import { Response, Request } from 'express';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const findUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const updateAvatar = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }

      return res.send({ data: updatedUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }

      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const updateUser = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }

      return res.send({ data: updatedUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }

      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
