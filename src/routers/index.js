const router = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./user');
const categoryRouter = require('./category');

router.use('/login', loginRouter);

router.use('/user', userRouter);

router.use('/categories', categoryRouter);

module.exports = router;
