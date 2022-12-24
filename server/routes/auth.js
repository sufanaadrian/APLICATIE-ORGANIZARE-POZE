import express from "express";
import { loginFunc } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", loginFunc);

export default router;
