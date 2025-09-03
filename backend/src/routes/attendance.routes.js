// routes/attendanceRoutes.js
import express from "express";
import pool from "../db/index.js";
import { verifyQR } from "../utils/qrGenerator.js";

const router = express.Router();

/**
 * Mark attendance by scanning QR
 */
router.post("/scan", async (req, res) => {
  const { qrData } = req.body;
  if (!qrData) return res.status(400).json({ error: "QR data required" });

  // ✅ Verify QR authenticity
  const verified = verifyQR(qrData);
  if (!verified) return res.status(400).json({ error: "Invalid or tampered QR" });

  const { session_id, student_id } = verified;

  try {
    // ✅ Check session exists
    const [session] = await pool.query("SELECT id FROM sessions WHERE id = ?", [session_id]);
    if (session.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    // ✅ Check student exists
    const [student] = await pool.query("SELECT id FROM students WHERE id = ?", [student_id]);
    if (student.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ✅ Insert attendance
    await pool.query(
      "INSERT INTO attendance (session_id, student_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE scanned_at = CURRENT_TIMESTAMP",
      [session_id, student_id]
    );

    res.json({ message: "Attendance marked", session_id, student_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
});

export default router;