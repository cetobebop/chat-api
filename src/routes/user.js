import { Router } from "express";

const router = Router()


router.get("/", (req,res)=>{
    console.log(req.ip)
    res.send("hola")
})

export default router