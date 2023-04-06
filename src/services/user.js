const { User } = require('../models');
const { generateToken } = require('../utils/auth/jwt');
const httpError = require('../utils/httpError');

const register = async (user) => {
  const [newUser, created] = await User.findOrCreate({
    where: { email: user.email },
    defaults: { ...user },
  });

  if (!created) throw httpError.conflict('User already registered');
 
  const token = generateToken(newUser);
 
  return token;
};

const findAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  console.log(user);
  if (!user) throw httpError.notFound('User does not exist');

  return user;
};

module.exports = {
  register,
  findAll,
  findById,
};