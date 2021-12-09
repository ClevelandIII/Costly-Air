const CustomApiError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class Unauth extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.Unauthorized;
  }
}

module.exports = Unauth;
