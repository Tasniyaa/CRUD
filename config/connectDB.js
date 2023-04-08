const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("database connection success!");
    } catch (error) {
        console.log("failed");
    }
};

module.exports = connectDB;