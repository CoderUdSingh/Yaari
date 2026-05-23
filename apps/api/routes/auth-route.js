import express from "express";
import {
  getMe,
  login,
  logout,
  signUp,
  uploadProfilePicture,
} from "../controllers/usercontroller.js";
import { requiredAuth } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rate-limiter.js";
const router = express.Router();

router.post("/signup", authLimiter, signUp);
router.post("/login", authLimiter, login);

// protected route to get user details
router.get("/me", requiredAuth, getMe);
router.post("/logout", requiredAuth, logout);
router.put("/profile-picture", requiredAuth, uploadProfilePicture);

export default router;
