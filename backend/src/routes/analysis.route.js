import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadResume } from "../controller/analysis.controller.js";

const router = Router();

router.post("/uploads", protect, upload.single("resume"), uploadResume);

export default router;
