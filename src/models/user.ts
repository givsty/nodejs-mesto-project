import mongoose from 'mongoose';
import validator from 'validator';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';

interface IUser {
  _id: any;
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

interface IUserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

const UserScheme = new mongoose.Schema<IUser>({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    maxlength: 200,
    minlength: 2,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    // eslint-disable-next-line no-useless-escape
    match: /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

UserScheme.statics.findUserByCredentials = function (email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user: IUser | null) => {
      if (!user) {
        return Promise.reject(new Error('unauthorized'));
      }

      return bcrypt.compare(password, user.password).then((matched: any) => {
        if (!matched) {
          return Promise.reject(new Error('unauthorized'));
        }

        return user;
      });
    });
};

export default mongoose.model<IUser, IUserModel>('user', UserScheme);
