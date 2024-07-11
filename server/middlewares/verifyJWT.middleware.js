require("dotenv").config();
const jwt = require("jsonwebtoken");

const VerifyJWTMiddleware = (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken) {
    res.send({ message: "you may need token to get here!" });
  } else {
    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: "authentication failed!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = VerifyJWTMiddleware;
