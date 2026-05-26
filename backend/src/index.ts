import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import workoutRoutes from "./routes/workouts";
import goalRoutes from "./routes/goals";
import activityRoutes from "./routes/activity";
import userRoutes from "./routes/users";
import foodRoutes from "./routes/food";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT ?? 5000;

// ── Middleware ─────────────────────────────────────────────────────────────

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : "http://localhost:5173", // Vite dev server
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Health check ───────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API routes ─────────────────────────────────────────────────────────────

app.use("/api/workouts", workoutRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);

// ── Error handling ─────────────────────────────────────────────────────────

app.use(notFound);
app.use(errorHandler);

// ── Start ──────────────────────────────────────────────────────────────────

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   ENV: ${process.env.NODE_ENV ?? "development"}`);
  });
};

start();
