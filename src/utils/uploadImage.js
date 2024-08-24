import moment from "moment-round";

import { cloudinaryInstance } from "../global/cloudinaryInstance.js";

export async function uploadImage(tag) {
  try {

    const tag = moment().floor(12, "hours").format();
    const result = await cloudinaryInstance.uploader.upload(imagePath,{
      tags: tag
    });
    
    console.log(result);

    return result;
  } catch (err) {
    if (err) {
      console.warn(err);
    }
  }
}
