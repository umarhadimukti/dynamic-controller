import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI: string =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-projects.2wh8y.mongodb.net/${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully ✅');
    } catch (err) {
        console.error(`failed connect to db: ${err}`)
        process.exit(1);
    }
}

export default connectDB;