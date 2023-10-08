const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

const checkPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = { hashPassword, checkPassword};
