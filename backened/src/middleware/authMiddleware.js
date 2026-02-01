const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      const error = new Error("Access denied. Token missing");
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;

    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};

module.exports = authenticateToken;