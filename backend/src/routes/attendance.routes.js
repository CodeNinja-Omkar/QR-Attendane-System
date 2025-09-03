// src/routes/attendance.routes.js
// Routes for marking and viewing attendance

import { Router } from "express";
import {
  markAttendance,
  getAttendanceBySession,
} from "../models/attendance.model.js";

const router = Router();

// Mark attendance (scanned QR)
router.post("/", async (req, res, next) => {
  try {
    const { session_id, student_id } = req.body;
    if (!session_id || !student_id) {
      return res
        .status(400)
        .json({ error: "session_id and student_id required" });
    }
    const result = await markAttendance({ session_id, student_id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Get attendance list for session
router.get("/:session_id", async (req, res, next) => {
  try {
    const rows = await getAttendanceBySession(req.params.session_id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
