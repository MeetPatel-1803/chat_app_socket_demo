import { Router } from "express";
import { addUser, getUser } from "../../controllers/userController.js";
import {
  register,
  login,
  forgotPassword,
} from "../../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
} from "../../validations/authValidations.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

// Authentication Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);

// User Routes
router.post("/user", addUser);
router.get("/user", authMiddleware, getUser);

export default router;
