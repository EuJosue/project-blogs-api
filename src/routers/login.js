const router = require('express').Router();
const validateEmailAndPassword = require('../middlewares/validateEmailAndPassword');
const { loginService } = require('../services');

router.post('/', validateEmailAndPassword, async (req, res) => {
  const { email, password } = req.body;

  const token = await loginService(email, password);

  return res.status(200).json({ token });
});

module.exports = router;