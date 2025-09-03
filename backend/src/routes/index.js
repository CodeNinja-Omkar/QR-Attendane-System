// src/routes/index.js
// Base router, can mount multiple route files

import { Router } from "express";
import qrRoutes from "./qr.routes.js";
import studentRoutes from "./student.routes.js";

const router = Router();

router.use("/qr", qrRoutes); // /api/qr/* endpoints
router.use("/students", studentRoutes); // <-- new

// Default route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to QR Attendance API" });
});

export default router;
