import { cloudinaryInstance } from "../global/cloudinaryInstance.js";

export function uploadImage (imagePath){
    cloudinaryInstance.uploader.upload(imagePath).then(result=>{  
        console.log(result)

        return result
     
    }).catch(function (err) {
        
        if (err) { console.warn(err); }
      });
    
}