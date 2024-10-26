import express from "express";
import { googleAuth } from "../controllers/authController";

const router = express.Router();

router.post("/google", googleAuth);

export default router;
