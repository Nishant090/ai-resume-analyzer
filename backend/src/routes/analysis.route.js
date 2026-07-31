import { Router } from "express";
import {protect} from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.post("/uploads", protect, upload.single("resume"), (req, res) => {
  res.json({
    success: true,
    file: req.file,
  });
});

export default router;
