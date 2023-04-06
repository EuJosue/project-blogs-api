const router = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./user');

router.use('/login', loginRouter);

router.use('/user', userRouter);

module.exports = router;
