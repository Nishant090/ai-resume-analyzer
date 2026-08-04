import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  deleteAnalysis,
  getAnalysisById,
  getHistory,
  uploadResume,
} from "../controller/analysis.controller.js";

const router = Router();
router.use(protect);
router.post("/uploads", upload.single("resume"), uploadResume);
router.get("/history", getHistory);
router.get("/:id", getAnalysisById);
router.delete("/:id", deleteAnalysis);

export default router;
