import express from "express";
import { googleAuth } from "../";

const router = express.Router();

router.post("/google", googleAuth);

export default router;
