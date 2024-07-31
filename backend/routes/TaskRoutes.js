import { Router } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} from "../controllers/TaskController.js";
import { config } from "dotenv";
import { verifySesssion } from "../middlewares/AuthMiddleware.js";

config();

const router = Router();

router.get("/tasks", verifySesssion, getTasks);
router.post("/tasks", verifySesssion, createTask);
router.patch("/tasks/:id", verifySesssion, updateTask);
router.delete("/tasks/:id", verifySesssion, deleteTask);

export default router;
