import { Router } from "express";
import getInfo from "../controllers/infoController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const infoRouter = Router();

infoRouter.get("/", authUser, getInfo);
export default infoRouter;
