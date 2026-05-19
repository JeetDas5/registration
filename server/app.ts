import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the User Registration API");
});

app.use("/api/auth", authRoutes);

export default app;
