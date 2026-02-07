import { Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
// eslint-disable-next-line import/no-unresolved
import { CODE_STATUS, ERROR_MESSAGES } from 'contstants/error';
import Card from '../models/card';

export const createCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }
      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const getCard = (req: Request, res: Response) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(CODE_STATUS.badRequest)
      .send({ message: ERROR_MESSAGES.somethingWrong }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        return res.status(CODE_STATUS.notFound).send({ message: ERROR_MESSAGES.userNotFoud });
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }
      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const likeCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(CODE_STATUS.notFound).send({ message: ERROR_MESSAGES.cardNotFound });
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }
      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const deleteLike = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId as unknown as Object } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(CODE_STATUS.notFound).send({ message: ERROR_MESSAGES.cardNotFound });
      }

      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }

      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};
