import { Router } from "express";
import { getVipPage } from "../controllers/vipController.js";

const vipRouter = Router();
vipRouter.get("/", getVipPage);

export { vipRouter };
