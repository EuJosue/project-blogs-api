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

module.exports = {
  register,
};