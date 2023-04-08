const User = require("../../models/userModel");
const bcrypt = require("bcrypt");


//////   Get All User //////

exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({
            message: "something went wrong!",
        });
    }
};

//////   Update User //////

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "wrong user",
            });
        }
        req.body.password = await bcrypt.hash(req.body.password,11);

        const updateUserData = await User.findByIdAndUpdate(userId,req.body,{
            new: true,
        });
        res.status(200).json({
            message:"profile update successful",
            updateUserData,
        })
    } catch (error) {
        res.status(401).json({
            message: "update wrong!!!",
        });
    }
}

//////   Delete User /////

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "wrong user!!",
            });
        }
        const deleteUserData = await User.findByIdAndDelete(userId);
        res.status(200).json({
            message:"profile delete successful",
            deleteUserData,
        })
    } catch (error) {
        res.status(401).json({
            message: "update wrong!!!",
        });
    }
}