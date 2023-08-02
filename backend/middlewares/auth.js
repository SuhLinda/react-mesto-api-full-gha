const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

function authorizationUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key', { expiresIn: '7d' });
  } catch (err) {
    next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
}

module.exports = authorizationUser;
