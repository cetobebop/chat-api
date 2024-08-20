import { uploadSingleImage } from "../middlewares/imagesUploads.js";
import { emitterImageControllerToSocket } from "../global/eventEmitter.js";
import { validateMessages } from "../middlewares/validateMessages.js";
import { findUser } from "../utils/findUser.js";
import { uploadImage } from "../utils/uploadImage.js";

class ImagesControllers {
  setImage(req, res) {
    uploadSingleImage(req, res, async function (err) {
      if (err) {
        
        return res.status(400).json({
          status: "error",
          msg: err.message,
        });
      }
      
      const {sender, receiver} = req.body
      const {file} = req

      const msg = `https://chat-front-gk8r.onrender.com/${file.filename}`

      //  const msg = `http://localhost:3000/public/${file.filename}`

       console.log(msg)

      uploadImage(msg)

      const errors = validateMessages({sender, receiver, msg})
      
      if(errors.length) return res.status(400).json({
        status: "error",
        msg: "invalid parameters"
      })


      const receiverUser = await findUser(undefined, receiver)

      if(!receiverUser) return res.status(404).json({
        status: "error",
        msg: "receiver not found"
      })

      emitterImageControllerToSocket.emit("server-event-emitter:client-sent-image" + sender, {sender, receiver, msg, isAMultimediaFile : true}, receiverUser)
    
      
      return res.json({ status: "success" });
    });


  }
}

export default new ImagesControllers();
