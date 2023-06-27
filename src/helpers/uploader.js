const path = require("path");
const multer = require("multer");
require("dotenv").config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },

  filename: (req, file, cb) => {
    const uniquePrefix = (Math.random() * 1000).toFixed();
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
    return;
  }

  cb(null, false);
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
