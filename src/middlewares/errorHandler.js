const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

module.exports = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  console.log(error);

  return res.status(500).json({ message: 'Internal Server Error' });
};