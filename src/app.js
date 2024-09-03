import express from 'express';
import cors from "cors"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';    

import router from './routes/index.js';
 

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

var whitelist = ['https://chat-front-gk8r.onrender.com/', "https://chat-front-gk8r.onrender.com", "http://localhost:9000"]

app.use(cors({
    origin: function (origin, callback) {
        console.log("origin: " , origin)
        console.log(whitelist.indexOf(origin) !== -1, " resolucion de cors")

        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
          console.log("valido")
        } else {
            console.log("invalido")
          callback(new Error('Not allowed by CORS'))
        }
      },
    optionsSuccessStatus: 200 
}))

app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "uploads" )))
 
 
app.use("/images", router.imagesRouter)

export default app;