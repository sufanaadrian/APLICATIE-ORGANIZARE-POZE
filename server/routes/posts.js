import express, { Router } from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

/**READ VALUES */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/**UPDATE VALUES */
router.patch("/:id/like", verifyToken, likePost);
//router.patch("/:id/comment", verifyToken, commentPost);

export default router;
