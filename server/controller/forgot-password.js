import User from "../model/user.js";
import jwt from "jsonwebtoken";

const jwt_secret = "this-is-a-secret-key";
const forgotPassword = async function (req, res, next) {
    let user = await User.findOne({ email: "manavbafna@email.com" });// have to change email to email that we get from frontend

    if (!user) {
        res.status(400).send("User not signed up");
        return;
    }

    const secret = jwt_secret + user.password;
    const payload = {
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const URL = `http://localhost:3000/reset-password/${user.id}/${token}`;
    console.log(URL); // here we need to send this to user email
    res.send("Password reset link has be sent");

}

export default forgotPassword;