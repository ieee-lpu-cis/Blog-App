const { generateAccessToken } = require("../authentication/token.js");
const { hashPassword, checkPassword } = require("../authentication/hash.js");
const express = require("express");
const { User } = require("../db/models.js");
const { z } = require("zod");

const authRouter = express.Router();

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

authRouter.post("/register", async (req, res) => {
  let data = registerSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json(data.error);
  } else {
    const { username, password, email } = data.data;
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    const token = generateAccessToken(user._id);
    res.status(200).json({
      message: "User created successfully hzha",
      token,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const loginData = loginSchema.safeParse(req.body);

    if (!loginData.success) {
      return res.status(400).json({ error: "Invalid login data" });
    }

    const user = await User.findOne({ username: loginData.data.username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await checkPassword(loginData.data.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateAccessToken(user._id);

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// authRouter.post("forgotpassword", (req, res) => {
//   res.send("forgotpassword");
// });

// authRouter.post("resetpassword", (req, res) => {
//   res.send("resetpassword");
// });

module.exports = authRouter;
