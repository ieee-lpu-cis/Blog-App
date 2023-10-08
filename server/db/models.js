const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  resetpasswordtoken: String,
  resetpasswordexpire: Date,
});

const User = mongoose.model("User", userSchema)

module.exports = { User };
