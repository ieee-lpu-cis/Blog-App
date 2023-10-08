const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

const verifyTokens = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.id = data;
    next();
  });
};

module.exports = { generateAccessToken, verifyTokens };