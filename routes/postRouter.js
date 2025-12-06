import { Router } from "express";
import {
  getNewPostPage,
  createPost,
  deletePost,
} from "../controllers/postController.js";

const postRouter = Router();
postRouter.get("/new", getNewPostPage);
postRouter.post("/new", createPost);
postRouter.get("/:id/delete", deletePost);

export { postRouter };
