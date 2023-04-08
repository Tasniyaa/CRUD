const { getAllUser, updateUser, deleteUser } = require("../../controllers/authController/userController");
const { authMiddleware } = require("../../middlewares/auth");

const userRouter = require("express").Router();

userRouter.get("/", authMiddleware, getAllUser);
userRouter.put('/:userId', authMiddleware, updateUser);
userRouter.delete('/:userId', authMiddleware, deleteUser);

module.exports = userRouter;