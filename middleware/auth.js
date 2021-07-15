const jwt = require("jsonwebtoken");
const config = require("config");

const auth = function (req, res, next) {
  //Get token from Header

  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, authorized denied" });
  }

  try {
    const decoded = jwt.verify(token, `${config.get("jwtSecret")}`);
    console.log(decoded);

    req.user = decoded.user;

    next();
  } catch (err) {
    if (err) throw err;
  }
};

module.exports = auth;
