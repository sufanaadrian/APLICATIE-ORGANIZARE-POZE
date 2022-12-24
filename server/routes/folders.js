import express from "express";
import {
  getFoldersFunc,
  createFolderFunc,
  deleteFolderFunc,
} from "../controllers/folders.js";
const router = express.Router();

router.get("/", getFoldersFunc);
router.post("/", createFolderFunc);
router.delete("/:folderId", deleteFolderFunc);
// router.patch("/:folderId", updateFolder);

export default router;
