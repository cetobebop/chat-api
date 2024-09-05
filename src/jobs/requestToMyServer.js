import axios from "axios";
import { config } from "dotenv";

config()

const url = process.env.MY_SERVER_URL; 


async function reloadWebsite() {
  try {
    const res = await axios.get(url)
    console.log( res.data, " solicitud realizada al servidor")
  } catch (error) {
    console.log("error en la solicitud de reactivacion de servidor")
  }  
}

const reloadWebsiteTime = "*/2 * * * *"

export {
  reloadWebsite,
  reloadWebsiteTime
}