// src/db/index.js
// MySQL connection pool setup

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool using env variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port:process.env.DB_PORT || "3308",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "qr_attendance",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Simple test function to check connection
export async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("DB connected. Test result:", rows[0].result);
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
}

export default pool;
