import { Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
import Card from '../models/card';

export const createCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getCard = (req: Request, res: Response) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
export const deleteCard = (req: Request, res: Response) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((updateCardLike) => res.status(200).send({ data: updateCardLike }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// export const likeCard = (req: Request, res: Response) => {

// };
