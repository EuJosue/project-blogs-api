const { verifyToken } = require('../utils/auth/jwt');

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};