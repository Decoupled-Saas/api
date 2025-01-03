import { requireAuth } from "@/common/middleware/auth";
import { validateRequest } from "@/common/utils/httpHandlers";
import { wrapper } from "@/common/utils/wrapper";
import { authController } from "@/controllers/authController";
import { AuthLoginPostSchema, AuthRegisterPostSchema } from "@/schemas/authSchema";
import { checkEmail, checkFirstName, checkLastName, checkPass } from "@/validators/authValidator";
import { Router } from "express";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(AuthRegisterPostSchema),
  checkFirstName,
  checkLastName,
  checkEmail,
  checkPass,
  wrapper(authController.register),
);

authRouter.post("/login", validateRequest(AuthLoginPostSchema), checkEmail, checkPass, wrapper(authController.login));
authRouter.delete("/logout", requireAuth, wrapper(authController.logout));

export default authRouter;
