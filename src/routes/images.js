import { Router } from "express";

// import { uploadSingleImage } from "../middlewares/imagesUploads.js";
import ImagesControllers from "../controllers/images.js"

const router = Router()

router.post("/pepe", (req, res)=>{
    console.log(req.body)
    res.send("fino")
})

router.post("/image", (req,res)=>{
    
    return ImagesControllers.setImage(req,res)
 
})

export default router