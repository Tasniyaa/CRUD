const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/auth/authRouter");
const userRouter = require("./routes/auth/userRouter");
dotenv.config();

app.use(express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    connectDB();
});