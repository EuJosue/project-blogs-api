const router = require('express').Router();
const { userController } = require('../controllers');
const { validateNewUser } = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');

router.post('/', validateNewUser, userController.register);

router.get('/', validateToken, userController.findAll);

router.get('/:id', validateToken, userController.findById);

router.delete('/me', validateToken, userController.remove);

module.exports = router;