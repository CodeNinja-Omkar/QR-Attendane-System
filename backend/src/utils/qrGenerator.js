// src/utils/qrGenerator.js
// Generate QR codes with student + session info encoded

import QRCode from "qrcode";

// Generate a QR code data URL containing session + student info
export async function generateAttendanceQR({ session_id, student_id }) {
  const payload = JSON.stringify({ session_id, student_id });
  return await QRCode.toDataURL(payload); // returns base64 PNG as data URL
}
