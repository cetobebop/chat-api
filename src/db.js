import mongoose from "mongoose";
import { config } from "dotenv";

config()

const db_dir = process.env.DB_DIR

export async function connectDb() {
    try {
        await mongoose.connect(db_dir)
        console.log("conectado a la db")
    } catch (error) {
        console.log(error)
    }
}