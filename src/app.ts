import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { UserRequest } from 'types/user';
import cardRouter from './routes/card';
import userRouter from './routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATABASE = 'mongodb://localhost:27017/mestodb';
mongoose.connect(DATABASE);

// 1. Сначала парсеры
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Потом middleware для установки req.user
app.use((req, res, next) => {
  (req as unknown as UserRequest).user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

// 3. И только после этого роутеры
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.listen(3000, () => {
  console.log('server start on port', 3000);
});
