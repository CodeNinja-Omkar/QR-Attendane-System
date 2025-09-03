// src/routes/qrAttendance.routes.js
// Generate per-student QR codes for a session

import { Router } from "express";
import { generateAttendanceQR } from "../utils/qrGenerator.js";
import pool from "../db/index.js";

const router = Router();

// Generate QR codes for all students in a session
router.get("/:session_id", async (req, res, next) => {
  try {
    const { session_id } = req.params;

    // Get all students (you could filter by division/subject if needed)
    const [students] = await pool.query("SELECT * FROM students");

    const qrCodes = [];
    for (const student of students) {
      const qrData = await generateAttendanceQR({
        session_id,
        student_id: student.id,
      });
      qrCodes.push({
        student_id: student.id,
        name: student.name,
        roll_no: student.roll_no,
        qr: qrData, // base64 QR
      });
    }

    res.json(qrCodes);
  } catch (err) {
    next(err);
  }
});

export default router;
