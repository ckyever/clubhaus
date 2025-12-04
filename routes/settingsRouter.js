import { Router } from "express";
import { getSettingsPage } from "../controllers/settingsController.js";

const settingsRouter = Router();
settingsRouter.get("/", getSettingsPage);

export { settingsRouter };
