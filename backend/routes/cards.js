const router = require('express').Router();
const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validationData');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validationCreateCard, createCard);
router.delete('/cards/:id', validationCardId, deleteCard);
router.put('/cards/:id/likes', validationCardId, likeCard);
router.delete('/cards/:id/likes', validationCardId, dislikeCard);

module.exports = router;
