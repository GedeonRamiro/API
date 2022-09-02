require("dotenv").config();

const JWTSecret = `${process.env.JWT_KEY}`;

module.exports = JWTSecret;
