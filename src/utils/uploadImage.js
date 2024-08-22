import { cloudinaryInstance } from "../global/cloudinaryInstance.js";

export async function uploadImage(imagePath) {
  try {
    const result = await cloudinaryInstance.uploader.upload(imagePath);
    
    console.log(result);

    return result;
  } catch (err) {
    if (err) {
      console.warn(err);
    }
  }
}
