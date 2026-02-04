import { Request } from 'express';

export interface UserRequest extends Request {
    user?: {
      _id: string;
    };
}

export interface CreateUser extends Request{
  name: string;
  about: string;
  avatar: string;
}
