import { Router } from "express";
import { getProfilePage } from "../controllers/profileController.js";

const profileRouter = Router();
profileRouter.get("/", getProfilePage);

export { profileRouter };
