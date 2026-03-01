import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import cookieParser from 'cookie-parser';
import { errorLogger } from './middlewares/logger';
import { login, createUser } from './controllers/users';
import { ERROR_MESSAGES } from './constants/error';
import { AppError } from './types/app';
import auth from './middlewares/auth';
import cardRouter from './routes/card';
import userRouter from './routes/user';
import NotFoundError from './errors/not-found';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorLogger);
const DATABASE = 'mongodb://localhost:27017/mestodb';
mongoose.connect(DATABASE);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Неверный путь'));
});

app.use((err: AppError, req: Request, res: Response) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? ERROR_MESSAGES.somethingWrong : message,
  });
});

app.listen(3001, () => {
  console.log('server start on port', 3001);
});
