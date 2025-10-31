const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            // ambil drivers di mongodb.com
           "mongodb+srv://rikaa:rahmarika08@cluster0.iwhxbz9.mongodb.net/tugas2?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("Error : ", error);
        process.exit(1);
    }
}

module.exports = connectDB;