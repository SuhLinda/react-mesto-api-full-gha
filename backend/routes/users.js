const router = require('express').Router();
const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validationData');
const {
  getUserMe,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.get('/users', getUsers);
router.get('/users/:id', validationUserId, getUser);
router.patch('/users/me', validationUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
