const { User } = require('../models');
const { generateToken } = require('../utils/auth/jwt');
const httpError = require('../utils/httpError');

module.exports = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) throw httpError.badRequest('Invalid fields');

  const token = generateToken(user);

  return token;
};