import express from "express";
import {
  getUserFunc,
  getUserFriendsFunc,
  addRemoveFriendFunc,
} from "../controllers/users.js";
import { verifyWithToken as verifyWithToken } from "../middleware/auth.js";

const expressRouter = express.Router();

/* add remove */
expressRouter.patch("/:id/:friendId", verifyWithToken, addRemoveFriendFunc);
/* get */
expressRouter.get("/:id", verifyWithToken, getUserFunc);
expressRouter.get("/:id/friends", verifyWithToken, getUserFriendsFunc);

export default expressRouter;
