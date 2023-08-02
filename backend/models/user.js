const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { regExp } = require('../utils/constants');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, 'Минимальная длина поля "name" - 2 знака'],
      maxLength: [30, 'Максимальная длина поля "name" - 30 знаков'],
      default: 'Жак-Ив Кусто',
      required: false,
    },
    about: {
      type: String,
      minLength: [2, 'Минимальная длина поля "name" - 2 знака'],
      maxLength: [30, 'Максимальная длина поля "name" - 30 знаков'],
      default: 'Исследователь',
      required: false,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      required: false,
      validate: {
        validator: (url) => {
          regExp.test(url);
        },
        message: 'Введён некорректный URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Необходимо заполнить поле "email"'],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Введён некорректный email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Необходимо заполнить поле "password"'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized('Неправильные почта или пароль'));
          }
          return user;
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
