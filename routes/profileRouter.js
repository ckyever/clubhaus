import { Router } from "express";
import {
  getProfilePage,
  updateProfile,
} from "../controllers/profileController.js";

const profileRouter = Router();
profileRouter.get("/", getProfilePage);
profileRouter.post("/", updateProfile);

export { profileRouter };
