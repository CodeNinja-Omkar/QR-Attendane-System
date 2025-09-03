-- src/db/schema.sql

CREATE DATABASE IF NOT EXISTS qr_attendance;
USE qr_attendance;

-- Student info
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  division VARCHAR(10),
  dept VARCHAR(50),
  year VARCHAR(10)
);

-- Session info (one per class)
CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  division VARCHAR(50),
  session_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Attendance records

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  student_id INT NOT NULL,
  scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_attendance (session_id, student_id),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

