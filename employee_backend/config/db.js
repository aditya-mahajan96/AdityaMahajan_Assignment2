const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(
        //My connection string to connect with MongoDBCompass
        "mongodb+srv://adityatechfarmerz:aditya_1996@cluster0.pqedhhz.mongodb.net/AdityaFullStackFall?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
