import dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: "dch7va8vv",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const cloudinaryInstance = cloudinary

export {
    cloudinaryInstance
}
