import { Router } from "express";
import {
  createPost,
  getMyPosts,
  updatePost,
  deletePost
} from "./post.controller.js";
import { userMiddleware } from "../../Middlewares/user.middleware.js";

const router = Router();

router.use(userMiddleware);
router.post("/posts", createPost);
router.get("/posts", getMyPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
