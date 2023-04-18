require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.development",
});

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
