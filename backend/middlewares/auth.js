const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

function authorizationUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
  } catch (err) {
    next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
}

module.exports = authorizationUser;
