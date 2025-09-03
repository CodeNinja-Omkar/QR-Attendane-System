// src/app.js
// Configures the Express application

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import indexRoutes from "./routes/index.js";

const app = express();

// ---- Middleware ----
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body
app.use(morgan("dev")); // HTTP request logger

// ---- Routes ----
app.use("/api", indexRoutes);

// Health check route (optional)
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

// ---- Error Handling ----
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
