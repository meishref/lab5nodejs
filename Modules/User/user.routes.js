import { Router } from "express";
import { signup, signin, confirmEmail } from "./user.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/confirm-email/:token", confirmEmail);

export default router;