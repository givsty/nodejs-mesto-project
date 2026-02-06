import { Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
import Card from '../models/card';

export const createCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const getCard = (req: Request, res: Response) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ message: 'Публикация удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const likeCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const deleteLike = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId as unknown as Object } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }

      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
