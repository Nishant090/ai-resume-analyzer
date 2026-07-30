import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route"

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/v1/auth",authRoutes)

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "app is running",
  });
});

export default app;
