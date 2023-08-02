const router = require('express').Router();

const ErrorNotFound = require('../errors/ErrorNotFound');

router.use(() => {
  throw new ErrorNotFound('Данной страницы не существует');
});

module.exports = router;
