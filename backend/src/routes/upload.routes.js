const express = require("express");
const multer = require("multer");
const { upload } = require("../controllers/upload.controller");
const path = require("path");
const { UPLOAD_DIR } = require("../config/paths");

const router = express.Router();

const storage = multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    }
});
  
const uploadMiddleware = multer({ storage });

router.post("/", uploadMiddleware.single("file"), upload);

module.exports = router;
