import { requireAuth } from "@/common/middleware/auth";
import { wrapper } from "@/common/utils/wrapper";
import { iamController } from "@/controllers/iamController";
import { Router } from "express";

const iamRouter = Router();

iamRouter.get("/roles", requireAuth, wrapper(iamController.getRoles));
iamRouter.get("/permissions", requireAuth, wrapper(iamController.getPermission));

export default iamRouter;
