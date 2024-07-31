import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/AuthController.js";
import { config } from "dotenv";
import { verifySesssion } from "../middlewares/AuthMiddleware.js";
import { UserModel } from "../models/User.js";

config();

const router = Router();

router.get("/user/me", verifySesssion, async (req, res) => {
  const profile = await UserModel.findById(req.user.user);
  res.send({full_name: profile.full_name, avatar_url: profile.avatar_url});
});
router.post("/logout", verifySesssion, logoutController);
router.post("/auth/login", loginController);
router.post("/auth/register", registerController);

export default router;
