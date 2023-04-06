const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, secret, jwtConfig);

  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

const decodeToken = (token) => {
  const decoded = jwt.decode(token, { complete: true });
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};