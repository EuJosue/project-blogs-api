const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const sequelize = require('sequelize');
const ApiError = require('../utils/ApiError');

const verifyCategoryError = (error) => (
  error instanceof sequelize.ForeignKeyConstraintError && error.table === 'categories');

const verifyTokenError = (error) => (
  error instanceof JsonWebTokenError || error instanceof TokenExpiredError);

module.exports = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (verifyTokenError(error)) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  if (verifyCategoryError(error)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  console.log(error);

  return res.status(500).json({ message: 'Internal Server Error' });
};