import { Router } from "express";
import {
  getNewPostPage,
  createPost,
} from "../controllers/newPostController.js";

const newPostRouter = Router();
newPostRouter.get("/", getNewPostPage);
newPostRouter.post("/", createPost);

export { newPostRouter };
