import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/";
        const dbName = process.env.MONGO_DB_NAME || "ecommerce";
        const connectionString = mongoUri.endsWith("/") ? `${mongoUri}${dbName}` : `${mongoUri}/${dbName}`;

        await mongoose.connect(connectionString);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;