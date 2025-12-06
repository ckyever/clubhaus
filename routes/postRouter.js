import { Router } from "express";
import { getNewPostPage, createPost } from "../controllers/postController.js";

const postRouter = Router();
postRouter.get("/new", getNewPostPage);
postRouter.post("/new", createPost);

export { postRouter };
