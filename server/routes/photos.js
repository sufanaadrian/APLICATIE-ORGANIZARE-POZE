// routes/photos.js

import express from "express";
import multer from "multer";
import { verifyWithToken as verifyWithToken } from "../middleware/auth.js";
import {
  getPhotosByFolderFunc,
  uploadPhotoFunc,
  deletePhotoFunc,
} from "../controllers/photos.js";

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get("/folder/:folderId", verifyWithToken, getPhotosByFolderFunc);
router.post(
  "/upload",
  verifyWithToken,
  upload.single("photo"),
  uploadPhotoFunc
);
router.delete("/:id", verifyWithToken, deletePhotoFunc);

export default router;
