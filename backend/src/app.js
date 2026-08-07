import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import analysisRoutes from "./routes/analysis.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL, // Your React/Vite frontend origin
    credentials: true,               // Allows cookies/headers to be sent
  }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/analysis", analysisRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "app is running",
  });
});

app.use(errorHandler);

export default app;
