const jwt = require("jsonwebtoken");
const JWTSecret = require("../token/JWTSecret");

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401), res.json({ message: "Sem token!" });
  }

  const bearerToken = authToken.split(" ");
  const token = bearerToken[1];

  jwt.verify(token, JWTSecret, (error, data) => {
    if (error) {
      return res.status(401), res.json({ message: "Token inválido!" });
    }

    req.token = data.token;
    next();
  });
};

module.exports = auth;
