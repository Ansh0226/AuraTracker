import express from "express";
import { googleAuth } from "../controllers/auth.controller";

const router = express.Router();

router.post("/google", googleAuth);

export default router;
