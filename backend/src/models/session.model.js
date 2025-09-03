// src/models/session.model.js
// Data access methods for sessions table

import pool from "../db/index.js";

// Create new session
export async function createSession({ subject, division, session_date }) {
  const [result] = await pool.query(
    `INSERT INTO sessions (subject, division, session_date)
     VALUES (?, ?, ?)`,
    [subject, division, session_date]
  );
  return result.insertId;
}

// Get all sessions
export async function getAllSessions() {
  const [rows] = await pool.query(
    "SELECT * FROM sessions ORDER BY session_date DESC"
  );
  return rows;
}

// Get one session by ID
export async function getSessionById(id) {
  const [rows] = await pool.query("SELECT * FROM sessions WHERE id = ?", [id]);
  return rows[0];
}

// Delete session
export async function deleteSession(id) {
  await pool.query("DELETE FROM sessions WHERE id=?", [id]);
  return { success: true };
}
