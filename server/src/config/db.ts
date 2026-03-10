import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;