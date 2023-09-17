import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const jwt_secret = "this-is-a-secret-key";
const resetPassword = async function (req, res, next) {
    const { id, token } = req.params;
    let user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!user) {
        res.send("Invalid user");
        return;
    }

    const secret = jwt_secret + user.password;
    try {
        const payload = jwt.verify(token, secret);
        user.password = "123";
        user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send("error while verifying in reset password : " + error);
    }
}

export default resetPassword;