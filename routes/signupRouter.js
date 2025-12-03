import { Router } from "express";
import { getSignupPage } from "../controllers/signupController.js";

const signupRouter = Router();
signupRouter.get("/", getSignupPage);

export { signupRouter };
