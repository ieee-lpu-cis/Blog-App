import Express from "express";
import mongoose from "mongoose";
import userLogin from "../controller/user-login.js";
import userSignUp from "../controller/user-signup.js";
import forgotPassword from "../controller/forgot-password.js"
import resetPassword from "../controller/reset-password.js"
import User from "../model/user.js";
import jwt from "jsonwebtoken";

const router = Express.Router();


router.get("/", (req, res) => {
    res.send("Blog App");
});

router.get("/signup", (req, res) => {
    res.send("signup page");
});

router.get("/login", (req, res) => {
    res.send("login page");
});

router.get("/home", (req, res) => {
    res.send("Home page")
})

router.get("/forgot-password", (req, res, next) => {
    res.send("Forgot Password");
})

const jwt_secret = "this-is-a-secret-key";
router.get("/reset-password/:id/:token", async (req, res, next) => {

    const { id, token } = req.params;
    let user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!user) {
        res.send("Invalid user");
        return;
    }

    const secret = jwt_secret + user.password;
    try {
        const payload = jwt.verify(token, secret);
        // here send the user to change pass
        res.send(user);
    } catch (error) {
        res.status(500).send("error while validating the forgot pass token " + error);
    }

})

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;