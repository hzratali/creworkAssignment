import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectToDb } from "./db/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import { verifySesssion } from "./middlewares/AuthMiddleware.js";

config();

const app = express();
const PORT = process.env.PORT || 3000;
const origin = process.env.ORIGIN;

app.use(
  cors({
    origin: [origin],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/authenticated", verifySesssion, (req, res) => {
  // console.log(req.user);
  res.send(true);
});

app.use(taskRoutes);
app.use(authRoutes);

app.get("/", verifySesssion, (req, res) => {
  res.send("Welcome to the app server");
});

// Start the server
const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

connectToDb(startListening);
