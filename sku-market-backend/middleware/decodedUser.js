const config = require("../config");
const jwt = require("jsonwebtoken");

const decodedUser = (token) => {
  const decoded = jwt.verify(token, config.JWT_SECRET);
  return decoded;
};

module.exports = decodedUser;
