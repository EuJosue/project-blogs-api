const ApiError = require('./ApiError');

const httpError = {
  notFound: (message) => new ApiError(404, message),
  badRequest: (message) => new ApiError(400, message),
  unprocessableEntity: (message) => new ApiError(422, message),
  unauthorized: (message) => new ApiError(401, message),
  forbidden: (message) => new ApiError(403, message),
};

module.exports = httpError;