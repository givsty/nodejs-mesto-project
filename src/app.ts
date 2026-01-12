import express from 'express';
import mongoose from 'mongoose';
import cardRouter from './routes/card';
import userRouter from './routes/user';

const app = express();

const DATABASE = 'mongodb://localhost:27017/mestodb';

app.use('/cards', cardRouter);
app.use('/users', userRouter);

mongoose.connect(DATABASE);
app.listen(3000, () => {
  console.log('server start on port', 3000);
});
