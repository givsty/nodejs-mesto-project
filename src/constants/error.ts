export const CODE_STATUS = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
};

export const ERROR_MESSAGES = {
  uncorrectData: 'Некорректные данные',
  somethingWrong: 'Произошла ошибка',
  unCorrectID: 'Некорректный id',
  cardNotFound: 'Карточка не найдена',
  userNotFoud: 'Пользователь не найден',
  unauthorized: {
    wrongEmailorPass: 'Неправильные почта или пароль',
    notAuth: 'Необходима авторизация',
  },
  forbidden: 'Нет прав для удаления карточки',
  conflict: 'Пользователь с таким email уже существует',
} as const;
