import express from "express";
import {
  getPostsFromFeedFunc,
  getPostsByUserFunc,
  likePostFromFeedFunc,
} from "../controllers/posts.js";
import { verifyWithToken as verifyWithToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyWithToken, getPostsFromFeedFunc);
router.get("/:userId/posts", verifyWithToken, getPostsByUserFunc);

/* UPDATE */
router.patch("/:id/like", verifyWithToken, likePostFromFeedFunc);

export default router;
