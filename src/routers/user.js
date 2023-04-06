const router = require('express').Router();
const { userRouter } = require('../controllers');
const { validateNewUser } = require('../middlewares/validateNewUser');

router.post('/', validateNewUser, userRouter.register);

module.exports = router;