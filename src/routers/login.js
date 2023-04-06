const router = require('express').Router();
const validateEmailAndPassword = require('../middlewares/validateEmailAndPassword');
const { loginService } = require('../services');

router.post('/', validateEmailAndPassword, (req, res) => {
  const { email, password } = req.body;

  const token = loginService(email, password);

  res.status(200).json({ token });
});

module.exports = router;