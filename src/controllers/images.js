import moment from "moment-round";
import { config } from "dotenv";

import { uploadSingleImage } from "../middlewares/imagesUploads.js";
import { emitterImageControllerToSocket } from "../global/eventEmitter.js";
import { validateMessages } from "../middlewares/validateMessages.js";
import { findUser } from "../utils/findUser.js";
import { uploadImage } from "../utils/uploadImage.js";

config();

class ImagesControllers {
  setImage(req, res) {
    uploadSingleImage(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          status: "error",
          msg: err.message,
        });
      }

      const { sender, receiver } = req.body;
      const { file } = req;

      const urlServer = process.env.MY_SERVER_URL + `/public/${file.filename}`;

      const msg = !process.env.PROD
        ? {
            secure_url: urlServer,
          }
        : await uploadImage(urlServer);

      const errors = validateMessages({
        sender,
        receiver,
        msg: msg.secure_url,
      });

      if (errors.length)
        return res.status(400).json({
          status: "error",
          msg: "invalid parameters",
        });

      const receiverUser = await findUser(undefined, receiver);

      if (!receiverUser)
        return res.status(404).json({
          status: "error",
          msg: "receiver not found",
        });

      emitterImageControllerToSocket.emit(
        "server-event-emitter:client-sent-image" + sender,
        { sender, receiver, msg: msg.secure_url, isAMultimediaFile: true },
        receiverUser
      );

      return res.json({ status: "success" });
    });
  }
}

export default new ImagesControllers();
