import { Router } from "express";
import { register, login, getMe, logout } from "../controller/auth.controller.js";
import {
  register,
  login,
  getMe,
  logout,
} from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;
