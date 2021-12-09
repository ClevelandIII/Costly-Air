const BadRequest = require("./bad-request");
const CustomApiError = require("./custom-error");
const NotFoundError = require("./notFound");
const Unauth = require("./unauthenticated");

module.exports = {
  BadRequest,
  CustomApiError,
  NotFoundError,
  Unauth,
};
