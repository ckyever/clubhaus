import { Router } from "express";
import { getVipPage, submitPassphrase } from "../controllers/vipController.js";

const vipRouter = Router();
vipRouter.get("/", getVipPage);
vipRouter.post("/", submitPassphrase);

export { vipRouter };
