// src/models/student.model.js
// Data access methods for students table

import pool from "../db/index.js";

// Create new student
export async function createStudent({
  name,
  email,
  roll_number,
  division,
  dept,
  year,
}) {
  const [result] = await pool.query(
    `INSERT INTO students (name, email, roll_number, division, dept, year)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, roll_number, division, dept, year]
  );
  return result.insertId;
}

// Get all students
export async function getAllStudents() {
  const [rows] = await pool.query("SELECT * FROM students ORDER BY id ASC");
  return rows;
}

// Get one student by ID
export async function getStudentById(id) {
  const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
  return rows[0];
}

// Update student
export async function updateStudent(id, data) {
  const { name, email, roll_number, division, dept, year } = data;
  await pool.query(
    `UPDATE students SET name=?, email=?, roll_number=?, division=?, dept=?, year=? WHERE id=?`,
    [name, email, roll_number, division, dept, year, id]
  );
  return getStudentById(id);
}

// Delete student
export async function deleteStudent(id) {
  await pool.query("DELETE FROM students WHERE id=?", [id]);
  return { success: true };
}
