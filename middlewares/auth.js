const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
        const sToken = token.split(" ")[1];
        const decode = jwt.verify(sToken,process.env.PRIVET_KEY);
        const id = decode._id;
        const user = await User.findById(id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            message: "authentication wrong!",
            error,
        });
    }
};