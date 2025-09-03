// src/models/attendance.model.js
// Data access methods for attendance table

import pool from "../db/index.js";

// Mark attendance (prevent duplicates via UNIQUE constraint)
export async function markAttendance({ session_id, student_id }) {
  try {
    const [result] = await pool.query(
      `INSERT INTO attendance (session_id, student_id) VALUES (?, ?)`,
      [session_id, student_id]
    );
    return { success: true, id: result.insertId };
  } catch (err) {
    // If duplicate (already marked), just ignore
    if (err.code === "ER_DUP_ENTRY") {
      return { success: false, message: "Already marked present" };
    }
    throw err;
  }
}

// Get attendance list for a session
export async function getAttendanceBySession(session_id) {
  const [rows] = await pool.query(
    `SELECT a.id, s.name, s.roll_number, s.division, s.dept, a.scanned_at
     FROM attendance a
     JOIN students s ON a.student_id = s.id
     WHERE a.session_id = ?
     ORDER BY s.roll_number ASC`,
    [session_id]
  );
  return rows;
}
