import express from 'express';
import cors from "cors"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';    

import router from './routes/index.js';
 

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({
    origin: 'http://localhost:9000',
    optionsSuccessStatus: 200 
}))

app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "uploads" )))
 
 
app.use("/images", router.imagesRouter)

export default app;