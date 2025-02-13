const jwt = require("jsonwebtoken");
require("dotenv").config();

function isAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    req.isAuth = true;
    next();
  } catch (ex) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = isAuth;