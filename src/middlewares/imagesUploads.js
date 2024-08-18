import multer from "multer";
import { filterSingleImage } from "../utils/imagesFilter.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.slice(-3)
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

export const uploadSingleImage = multer({
  storage,
  fileFilter: filterSingleImage,
  limits: { fileSize: 524288},
}).single("image");
