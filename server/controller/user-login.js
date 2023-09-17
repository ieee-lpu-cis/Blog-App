import User from "../model/user.js";
import bcrypt from "bcrypt";

const userLogin = async (req, res) => {
    try {
        const username = req.body.UserName;
        const email = req.body.Email;
        const hashedpass = req.body.Password;
        // if (!email) {
        //     res.status(400).send("Email not found");
        // }
        // if (!username) {
        //     res.status(400).send("Enter a username");
        // }
        // if (!req.body.Password) {
        //     res.status(400).send("Password not found");
        // }
        let user = await User.findOne({ username: "mana" });// have change username to variable here
        if (!user) {
            return res.status(400).send("User with this username does not exist");
        }

        try {
            // let isMatch = await bcrypt.compare("this", user.password);
            let isMatch = "this";
            if (isMatch) {
                res.status(200).send("Successfully logged in");
            } else {
                res.status(400).send("Password does not match");
            }
        } catch (error) {
            console.log("while logging in ", error)
            res.status(500).send("error while logging in user ");
        }

    } catch (error) {
        console.log("error while logging in ", error);
        res.redirect("/login");
    }
}

export default userLogin;