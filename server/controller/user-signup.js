import User from "../model/user.js";
import bcrypt from "bcrypt";

const userSignUp = async (req, res) => {
    try {
        const firstName = req.body.FirstName;
        const lastName = req.body.LastName;
        const email = req.body.Email;
        const username = req.body.Username;
        // const hashedpass = await bcrypt.hash("this", 10);// have to change "this" to password that we get from frontend

        // if (!firstName) {
        //     res.status(400).send("You need to enter your first name");
        // }
        // if (!lastName) {
        //     res.status(400).send("You need to enter your last name");
        // }
        // if (!email) {
        //     res.status(400).send("Email not found");
        // }
        // if (!username) {
        //     res.status(400).send("Enter a username");
        // }
        // if (!req.body.Password) {
        //     res.status(400).send("Password not found");
        // }
        // push the user details in database
        // var newUser = new User({
        //     firstName: firstName,
        //     lastName: lastName,
        //     email: email,
        //     passwrod: hashedpass,
        //     username: username,
        //     blogs: []
        // })

        var newUser = new User({
            firstName: "Manav",
            lastName: "Bafna",
            email: "manavbafna@email.com",
            password: "this",
            username: "man",
            blogs: []
        })

        await newUser.save();
        // res.redirect("/login")
        return res.status(200).send("Signup Successful");

    } catch (error) {
        console.log("Error while signing up", error);
        res.status(500);
        res.redirect("/signup")
    }

}

export default userSignUp;