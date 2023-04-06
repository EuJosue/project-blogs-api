const router = require('express').Router();
const validateEmailAndPassword = require('../middlewares/validateEmailAndPassword');
const { loginService } = require('../services');

router.post('/', validateEmailAndPassword, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;