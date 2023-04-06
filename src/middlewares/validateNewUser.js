const joi = require('./joi');

const validateNewUser = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = joi.validateUser.validate({ displayName, email, password, image });

  if (error) return res.status(400).json({ message: error.message });

  next();
};

module.exports = {
  validateNewUser,
};