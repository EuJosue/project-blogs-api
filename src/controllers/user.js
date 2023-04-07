const { userService } = require('../services');

const register = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await userService.register({ displayName, email, password, image });

  return res.status(201).json({ token });
};

const findAll = async (_req, res) => {
  const users = await userService.findAll();

  return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.findById(id);

  return res.status(200).json(user);
};

const remove = async (req, res) => {
  const { id } = req.user;

  await userService.remove(id);

  return res.status(204).json();
};

module.exports = {
  register,
  findAll,
  findById,
  remove,
};