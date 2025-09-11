import { Router } from "express";
import { createUser, getUser } from "../../controllers/userController.js";

const router = Router();

router.post("/user", createUser);
router.get("/user", getUser);

export default router;
