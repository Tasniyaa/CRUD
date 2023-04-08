const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//signUp
exports.signup = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11);
        const { name, username, email, password, profile } = req.body;
        const user = await User.create({
            name,
            username,
            email,
            password,
            profile,
        });
        res.status(201).json({
            message: `hello ${name} your account created!!!`,
            user,
        });
    } catch (error) {
        res.status(401).json({
            message: "wrong!!!!!!!!!!!",
            error,
        });
    }
};

///////  logIn  //////

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: " user wrong!",
            });
        }
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) {
            return res.status(400).json({
                message: "password wrong!",
            });
        }


        const token = await jwt.sign(
            { username, _id: user._id }, 
            process.env.PRIVET_KEY,
        );

        res.status(200).json({
            message: "login successful",
            token,
        });

    } catch (error) {
        res.status(404).json({
            message: "not found!",
        });
    }
};