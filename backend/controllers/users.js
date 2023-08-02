const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_QUANTITY } = require('../utils/constants');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorUserExists = require('../errors/ErrorUserExists');

function getUserMe(req, res, next) {
  return User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(err);
    });
}

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      next(err);
    });
}

function getUser(req, res, next) {
  return User.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, SALT_QUANTITY)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new ErrorUserExists('Пользователь с таким email существует'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new ErrorUnauthorized('Неправильные почта или пароль'));
      next(err);
    });
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getUserMe,
  getUsers,
  getUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
