const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2d",
  });
  return token;
};


module.exports = generateAccessToken;