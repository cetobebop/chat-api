import moment from "moment-round";

import { cloudinaryInstance } from "../global/cloudinaryInstance.js";

export async function uploadImage(imagePath) {
  try {

    const public_id = moment().floor(12, "hours").format();
    const result = await cloudinaryInstance.uploader.upload(imagePath,{
      public_id
    });
    
    console.log(result);

    return result;
  } catch (err) {
    if (err) {
      console.warn(err);
    }
  }
}
