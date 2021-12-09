const jwt = require('jsonwebtoken')
const {Unauth} = require('../error')
require('dotenv').config

const authenticationCheck = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || auth.startsWith("Bearer ") == false) {
    throw new Unauth ("This authentication is incorrect");
  }

  const token = auth.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, name: payload.name };
    next();
  } catch (err) {
    throw new Unauth("Not authorized");
  }
};

module.exports = authenticationCheck;