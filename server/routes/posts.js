import express from "express";
import {
  getPostsFromFeedFunc,
  getPostsByUserFunc,
  likePostFromFeedFunc,
  sharePostInFeedFunc,
} from "../controllers/posts.js";
import { verifyWithToken as verifyWithToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyWithToken, getPostsFromFeedFunc);
router.get("/:userId/posts", verifyWithToken, getPostsByUserFunc);

/* UPDATE */
router.patch("/:id/like", verifyWithToken, likePostFromFeedFunc);
router.patch("/:id/share", verifyWithToken, sharePostInFeedFunc);
export default router;
