import axios from "axios";
import { config } from "dotenv";

config();

const url = process.env.MY_SERVER_URL;

async function reloadWebsite() {
  try {
    const res = await axios.get(url);
    console.log(res.data, " solicitud realizada al servidor");
  } catch (error) {
    console.log("error en la solicitud de reactivacion de servidor");
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
}

const reloadWebsiteTime = "*/2 * * * *";

export { reloadWebsite, reloadWebsiteTime };
