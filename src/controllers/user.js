const { userService } = require('../services');

const register = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await userService.register({ displayName, email, password, image });

  return res.status(201).json({ token });
};

module.exports = {
  register,
};