import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

export const postUsers = () => {};
