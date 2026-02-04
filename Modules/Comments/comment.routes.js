import { Router } from "express";
import { createComment, getMyComments } from "./comment.controller.js";
import { userMiddleware } from "../../Middlewares/user.middleware.js";

const router = Router();

router.use(userMiddleware);
router.post("/comments", createComment);
router.get("/comments", getMyComments);

export default router;
