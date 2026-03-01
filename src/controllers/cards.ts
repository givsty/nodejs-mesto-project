import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '../types/user';
import NotFoundError from '../errors/not-found';
import BadRequestError from '../errors/bad-request';
import ForbiddenError from '../errors/forbidden';
import Card from '../models/card';
import { CODE_STATUS, ERROR_MESSAGES } from '../constants/error';

export const createCard = (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(CODE_STATUS.success).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUS.badRequest).send({ message: ERROR_MESSAGES.unCorrectID });
      }
      return res.status(CODE_STATUS.internalServerError)
        .send({ message: ERROR_MESSAGES.somethingWrong });
    });
};

export const getCard = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const deleteCard = (req: UserRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(ERROR_MESSAGES.cardNotFound));
      }
      if (card.owner.toString() !== userId) {
        return next(new ForbiddenError(ERROR_MESSAGES.forbidden));
      }
      return card.deleteOne().then(() => res.send({ data: card }));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      }
      return next(error);
    });
};

export const likeCard = (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(ERROR_MESSAGES.cardNotFound));
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      }
      return next(error);
    });
};

export const deleteLike = (req: UserRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId as unknown as Object } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(ERROR_MESSAGES.cardNotFound));
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError(ERROR_MESSAGES.unCorrectID));
      }
      return next(error);
    });
};
